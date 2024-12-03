import { JwtService } from '@nestjs/jwt';
import { z } from 'zod';
import { UseCase } from '~decorators';
import { Token, TokenType } from '~domain/Token/Token';
import { DecodeTokenCommand } from './DecodeTokenCommand';
import { isPast } from 'date-fns';

@UseCase
export class DecodeTokenUseCase {
  private readonly tokenSchema = z.object({
    tokenType: z.nativeEnum(TokenType),
    iat: z.number(),
    exp: z.number(),
    aud: z.string(),
    iss: z.string(),
    sub: z.string()
  });

  constructor(private readonly jwt: JwtService) {}

  async run(command: DecodeTokenCommand): Promise<Token> {
    const payload = await this.tokenSchema.parseAsync(
      await this.jwt.decode(command.token)
    );

    const isExpired = isPast(payload.exp * 1000);
    const expirationIso = new Date(payload.exp * 1000).toISOString();

    return {
      type: payload.tokenType,
      isExpired,
      expiration: expirationIso,
      asString: command.token,
      payload
    };
  }
}

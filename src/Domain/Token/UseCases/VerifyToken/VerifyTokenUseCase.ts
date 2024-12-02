import { JwtService } from '@nestjs/jwt';
import { z } from 'zod';
import { UseCase } from '~decorators';
import { Token, TokenType } from '~domain/Token/Token';
import { VerifyTokenCommand } from './VerifyTokenCommand';
import { isPast } from 'date-fns';
import { Env } from '~_utils/Env';

@UseCase
export class VerifyTokenUseCase {
  private readonly tokenSchema = z.object({
    iat: z.number(),
    exp: z.number(),
    aud: z.string(),
    iss: z.string(),
    sub: z.string()
  });

  constructor(private readonly jwt: JwtService) {}

  async run(command: VerifyTokenCommand): Promise<Token> {
    const secret =
      command.tokenType === TokenType.ACCESS_TOKEN
        ? Env.ACCESS_TOKEN_SIGN_KEY
        : command.tokenType === TokenType.REFRESH_TOKEN
          ? Env.REFRESH_TOKEN_SIGN_KEY
          : Env.ID_TOKEN_SIGN_KEY;

    const payload = await this.tokenSchema.parseAsync(
      await this.jwt.verifyAsync(command.token, { secret: secret })
    );

    const isExpired = isPast(payload.exp * 1000);
    const expirationIso = new Date(payload.exp * 1000).toISOString();

    return {
      type: command.tokenType,
      isExpired,
      expiration: expirationIso,
      asString: command.token,
      payload
    };
  }
}

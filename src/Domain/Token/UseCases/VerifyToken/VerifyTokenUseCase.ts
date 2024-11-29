import { JwtService } from '@nestjs/jwt';
import { z } from 'zod';
import { UseCase } from '~decorators';
import { Token } from '~domain/Token/Token';
import { VerifyTokenCommand } from './VerifyTokenCommand';

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
    const payload = await this.tokenSchema.parseAsync(
      await this.jwt.verifyAsync(command.token, { secret: command.secret })
    );

    return {
      type: command.tokenType,
      asString: command.token,
      payload
    };
  }
}

import { JwtService } from '@nestjs/jwt';
import { UseCase } from '~decorators';
import { SignTokenCommand } from './SignTokenCommand';

@UseCase
export class SignTokenUseCase {
  constructor(private readonly jwt: JwtService) {}

  async run(command: SignTokenCommand): Promise<string> {
    const signedToken = await this.jwt.signAsync(command.payload || {}, {
      secret: command.secret,
      expiresIn: command.expireInSeconds,
      subject: command.userId,
      audience: 'aud',
      issuer: 'iss'
    });

    return signedToken;
  }
}

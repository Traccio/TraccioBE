import { UseCase } from '~decorators';
import { Token, TokenType } from '~domain/Token/Token';
import { SignTokenUseCase } from '../SignToken/SignTokenUseCase';
import { VerifyTokenUseCase } from '../VerifyToken/VerifyTokenUseCase';
import { GenerateRefreshCommand } from './GenerateRefreshTokenCommand';
import { Env } from '~_utils/Env';
import { DecodeTokenUseCase } from '../DecodeToken/DecodeTokenUseCase';

@UseCase
export class GenerateRefreshTokenUseCase {
  constructor(
    private readonly signTokenUseCase: SignTokenUseCase,
    private readonly verifyTokenUseCase: VerifyTokenUseCase,
    private readonly decodeTokenUseCase: DecodeTokenUseCase
  ) {}

  async run(command: GenerateRefreshCommand): Promise<Token> {
    const RefreshTokenExpiration1HourInSeconds = 60 * 60;

    const decodedRollingRefreshToken =
      command.__strategy === 'rolling'
        ? await this.decodeTokenUseCase.run({ token: command.rollingFrom })
        : null;

    const token = await this.signTokenUseCase.run({
      expireInSeconds: decodedRollingRefreshToken
        ? this._computeRemainingSeconds(decodedRollingRefreshToken.payload.exp)
        : RefreshTokenExpiration1HourInSeconds,
      secret: Env.REFRESH_TOKEN_SIGN_KEY,
      userId: command.userId,
      payload: {
        tokenType: TokenType.REFRESH_TOKEN
      }
    });

    const verifiedToken = await this.verifyTokenUseCase.run({
      tokenType: TokenType.REFRESH_TOKEN,
      token
    });

    return verifiedToken;
  }

  private _computeRemainingSeconds(
    expirationTimestampInSeconds: number
  ): number {
    const expirationTimestampInMillis = expirationTimestampInSeconds * 1000;
    const currentTimestampInMillis = Date.now();

    return Math.ceil(
      (expirationTimestampInMillis - currentTimestampInMillis) / 1000
    );
  }
}

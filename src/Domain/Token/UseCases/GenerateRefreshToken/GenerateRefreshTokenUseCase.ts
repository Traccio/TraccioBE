import { UseCase } from '~decorators';
import { Token, TokenType } from '~domain/Token/Token';
import { SignTokenUseCase } from '../SignToken/SignTokenUseCase';
import { VerifyTokenUseCase } from '../VerifyToken/VerifyTokenUseCase';
import { GenerateRefreshCommand } from './GenerateRefreshTokenCommand';
import { Env } from '~_utils/Env';

@UseCase
export class GenerateRefreshTokenUseCase {
  constructor(
    private readonly signTokenUseCase: SignTokenUseCase,
    private readonly verifyTokenUseCase: VerifyTokenUseCase
  ) {}

  async run(command: GenerateRefreshCommand): Promise<Token> {
    const token = await this.signTokenUseCase.run({
      secret: Env.REFRESH_TOKEN_SIGN_KEY,
      userId: command.userId,
      payload: {
        tokenType: TokenType.REFRESH_TOKEN
      }
    });

    const verifiedToken = await this.verifyTokenUseCase.run({
      secret: Env.REFRESH_TOKEN_SIGN_KEY,
      tokenType: TokenType.REFRESH_TOKEN,
      token
    });

    return {
      type: verifiedToken.type,
      asString: token,
      payload: verifiedToken.payload
    };
  }
}

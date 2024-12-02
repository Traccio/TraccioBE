import { UseCase } from '~decorators';
import { Token, TokenType } from '~domain/Token/Token';
import { SignTokenUseCase } from '../SignToken/SignTokenUseCase';
import { VerifyTokenUseCase } from '../VerifyToken/VerifyTokenUseCase';
import { GenerateAccessTokenCommand } from './GenerateAccessTokenCommand';
import { Env } from '~_utils/Env';

@UseCase
export class GenerateAccessTokenUseCase {
  constructor(
    private readonly signTokenUseCase: SignTokenUseCase,
    private readonly verifyTokenUseCase: VerifyTokenUseCase
  ) {}

  async run(command: GenerateAccessTokenCommand): Promise<Token> {
    const token = await this.signTokenUseCase.run({
      secret: Env.ACCESS_TOKEN_SIGN_KEY,
      userId: command.userId,
      payload: {
        tokenType: TokenType.ACCESS_TOKEN
      }
    });

    const verifiedToken = await this.verifyTokenUseCase.run({
      tokenType: TokenType.ACCESS_TOKEN,
      token
    });

    return verifiedToken;
  }
}

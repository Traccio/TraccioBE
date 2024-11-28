import { UseCase } from '~decorators';
import { Token, TokenType } from '~domain/Token/Token';
import { SignTokenUseCase } from '../SignToken/SignTokenUseCase';
import { VerifyTokenUseCase } from '../VerifyToken/VerifyTokenUseCase';
import { GenerateIDTokenCommand } from './GenerateIDTokenCommand';
import { Env } from '~_utils/Env';

@UseCase
export class GenerateIDTokenUseCase {
  constructor(
    private readonly signTokenUseCase: SignTokenUseCase,
    private readonly verifyTokenUseCase: VerifyTokenUseCase
  ) {}

  async run(command: GenerateIDTokenCommand): Promise<Token> {
    const token = await this.signTokenUseCase.run({
      secret: Env.ID_TOKEN_SIGN_KEY,
      userId: command.user.Id,
      payload: {
        tokenType: TokenType.ID_TOKEN,
        user: {
          id: command.user.Id,
          status: command.user.Status,
          username: command.user.Username,
          createdAt: command.user.CreatedAt,
          updatedAt: command.user.UpdatedAt
        }
      }
    });

    const verifiedToken = await this.verifyTokenUseCase.run({
      secret: Env.ID_TOKEN_SIGN_KEY,
      tokenType: TokenType.ID_TOKEN,
      token
    });

    return {
      type: verifiedToken.type,
      asString: token,
      payload: verifiedToken.payload
    };
  }
}

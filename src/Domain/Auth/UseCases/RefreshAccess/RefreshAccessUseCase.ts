import { UseCase } from '~decorators';
import { RefreshAccessCommand } from './RefreshAccessCommand';
import { GetOneUserUseCase } from '~domain/User/UseCases/GetOneUser/GetOneUserUseCase';
import { SignInData } from '../../Auth';
import { GenerateAccessTokenUseCase } from '~domain/Token/UseCases/GenerateAccessToken/GenerateAccessTokenUseCase';
import { GenerateRefreshTokenUseCase } from '~domain/Token/UseCases/GenerateRefreshToken/GenerateRefreshTokenUseCase';
import { GenerateIDTokenUseCase } from '~domain/Token/UseCases/GenerateIDToken/GenerateIDTokenUseCase';
import { VerifyTokenUseCase } from '~domain/Token/UseCases/VerifyToken/VerifyTokenUseCase';
import { nonNull } from '~_utils/NonNull';

@UseCase
export class RefreshAccessUseCase {
  constructor(
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
    private readonly generateRefreshTokenUseCase: GenerateRefreshTokenUseCase,
    private readonly generateIDTokenUseCase: GenerateIDTokenUseCase,
    //
    private readonly verifyTokenUseCase: VerifyTokenUseCase
  ) {}

  async run(command: RefreshAccessCommand): Promise<SignInData> {
    // decode and verify refreshToken
    const { payload: refreshTokenPayload, asString: refreshTokenToRoll } =
      await this.verifyTokenUseCase.run({
        token: command.refreshTokenStr,
        tokenType: 'REFRESH_TOKEN'
      });

    // retrieve user from persistence
    const user = nonNull(
      await this.getOneUserUseCase.run({
        __by: 'userId',
        userId: refreshTokenPayload.sub
      })
    );

    // generate tokens
    const idToken = await this.generateIDTokenUseCase.run({ user });
    const accessToken = await this.generateAccessTokenUseCase.run({
      userId: user.Id
    });
    const refreshToken = await this.generateRefreshTokenUseCase.run({
      __strategy: 'rolling',
      userId: user.Id,
      rollingFrom: refreshTokenToRoll
    });

    return {
      idToken,
      accessToken,
      refreshToken
    };
  }
}

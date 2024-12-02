import * as crypto from 'node:crypto';
import { UseCase } from '~decorators';
import { SignInCommand } from './SignInCommand';
import { GetOneUserUseCase } from '~domain/User/UseCases/GetOneUser/GetOneUserUseCase';
import { SignInData } from '../Auth';
import { GenerateAccessTokenUseCase } from '~domain/Token/UseCases/GenerateAccessToken/GenerateAccessTokenUseCase';
import { GenerateRefreshTokenUseCase } from '~domain/Token/UseCases/GenerateRefreshToken/GenerateRefreshTokenUseCase';
import { GenerateIDTokenUseCase } from '~domain/Token/UseCases/GenerateIDToken/GenerateIDTokenUseCase';

@UseCase
export class SignInUseCase {
  constructor(
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
    private readonly generateRefreshTokenUseCase: GenerateRefreshTokenUseCase,
    private readonly generateIDTokenUseCase: GenerateIDTokenUseCase
  ) {}

  async run(command: SignInCommand): Promise<SignInData> {
    // retrieve user from persistence
    const user = await this.getOneUserUseCase.run({
      __by: 'username',
      username: command.username
    });
    if (user === null) throw new Error();

    const userSalt = user.Salt;

    // check if passwords match
    const hash = crypto
      .pbkdf2Sync(command.passwords[0], userSalt, 10, 32, 'sha256')
      .toString('hex');
    if (hash !== user.Password) throw new Error();

    // generate tokens
    const idToken = await this.generateIDTokenUseCase.run({ user });
    const accessToken = await this.generateAccessTokenUseCase.run({
      userId: user.Id
    });
    const refreshToken = await this.generateRefreshTokenUseCase.run({
      userId: user.Id
    });

    return {
      idToken,
      accessToken,
      refreshToken
    };
  }
}

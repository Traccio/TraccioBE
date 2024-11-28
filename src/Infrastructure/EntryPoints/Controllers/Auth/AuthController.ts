import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public, BodyZod } from '~decorators';
import { ResponseDTO } from '~_types/ResponseDto';
import { buildSuccessResponse } from '~_utils/ResponseDto';
import { SignInUseCase } from '~domain/Auth/UseCases/SignIn/SignInUseCase';
import { SignInDto } from './Dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Public()
  @Post('sign-in')
  async signIn(
    @BodyZod(SignInDto.signInRequestBodyDtoSchema) body: SignInDto.SignInBody,
    @Res() res: Response
  ): Promise<void> {
    const signInData = await this.signInUseCase.run({
      username: body.username,
      passwords: body.passwords
    });

    res.cookie('access-token', signInData.accessToken, {
      sameSite: 'none',
      path: '/',
      domain: 'localhost',
      httpOnly: false,
      secure: false
    });
    res.cookie('refresh-token', signInData.refreshToken, {
      sameSite: 'none',
      path: '/',
      domain: 'localhost',
      httpOnly: false,
      secure: false
    });

    const response: ResponseDTO<SignInDto.AuthResponseDTO> =
      buildSuccessResponse({
        idToken: signInData.idToken.asString
      });

    res.send(response);
  }
}

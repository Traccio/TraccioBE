import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public, BodyZod } from '~decorators';
import { SuccessResponseDto } from '~_types/ResponseDto';
import { buildSuccessResponse } from '~_utils/ResponseDto';
import { SignInUseCase } from '~domain/Auth/UseCases/SignIn/SignInUseCase';
import { SignInDto, TokenDetailsResponseDTO } from './Dto';
import { TokenType } from '~domain/Token/Token';
import { CookieNames } from './_Constants';
import { setCookieInResponse } from '~_utils/Cookie';

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

    setCookieInResponse(res, [
      [CookieNames.COOKIE_ACCESS_TOKEN_NAME, signInData.accessToken.asString],
      [CookieNames.COOKIE_REFRESH_TOKEN_NAME, signInData.refreshToken.asString]
    ]);

    const response: SuccessResponseDto<TokenDetailsResponseDTO> =
      buildSuccessResponse({
        type: TokenType.ID_TOKEN,
        isExpired: signInData.idToken.isExpired,
        expiration: signInData.idToken.expiration,
        asString: signInData.idToken.asString,
        payload: signInData.idToken.payload
      });

    res.send(response);
  }
}

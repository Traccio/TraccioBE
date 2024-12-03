import { nonNull } from './../../../_Utils/NonNull';
import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public, BodyZod } from '~decorators';
import { SuccessResponseDto } from '~_types/ResponseDto';
import { buildSuccessResponse } from '~_utils/ResponseDto';
import { SignInUseCase } from '~domain/Auth/UseCases/SignIn/SignInUseCase';
import { SignInDto, TokenDetailsResponseDTO } from './Dto';
import { TokenType } from '~domain/Token/Token';
import { CookieNames } from './_Constants';
import { getCookiesFromRequest, setCookieInResponse } from '~_utils/Cookie';
import { HttpTraccioException } from '~exceptions';
import { ErrorCode } from '~_types/ErrorCode';
import { DecodeTokenUseCase } from '~domain/Token/UseCases/DecodeToken/DecodeTokenUseCase';
import { RefreshAccessUseCase } from '~domain/Auth/UseCases/RefreshAccess/RefreshAccessUseCase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly decodeTokenUseCase: DecodeTokenUseCase,
    private readonly refreshAccessUseCase: RefreshAccessUseCase
  ) {}

  @Public()
  @Post('token/refresh')
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    const refreshTokenStr = nonNull(
      getCookiesFromRequest(req, CookieNames.COOKIE_REFRESH_TOKEN_NAME),
      new HttpTraccioException(HttpStatus.BAD_REQUEST, {
        description: 'No refresh token found !',
        errorCode: ErrorCode._ERR_NO_REFRESH_TOKEN_PROVIDED
      })
    );

    const { accessToken, refreshToken, idToken } =
      await this.refreshAccessUseCase.run({
        refreshTokenStr
      });

    setCookieInResponse(res, [
      [CookieNames.COOKIE_ACCESS_TOKEN_NAME, accessToken.asString],
      [CookieNames.COOKIE_REFRESH_TOKEN_NAME, refreshToken.asString]
    ]);

    const responseBody: SuccessResponseDto<TokenDetailsResponseDTO> =
      buildSuccessResponse({
        ...idToken
      });

    res.send(responseBody);
  }

  @Public()
  @Get('token/infos')
  async tokenInfos(
    @Req() req: Request
  ): Promise<SuccessResponseDto<TokenDetailsResponseDTO[]>> {
    const accessToken = getCookiesFromRequest(
      req,
      CookieNames.COOKIE_ACCESS_TOKEN_NAME
    );
    const refreshToken = getCookiesFromRequest(
      req,
      CookieNames.COOKIE_REFRESH_TOKEN_NAME
    );

    if (!accessToken && !refreshToken)
      throw new HttpTraccioException(HttpStatus.NOT_FOUND, {
        description: 'No token found in request !',
        errorCode: ErrorCode._ERR_NO_TOKEN_PROVIDED
      });

    const response: TokenDetailsResponseDTO[] = [];
    if (accessToken)
      response.push(await this.decodeTokenUseCase.run({ token: accessToken }));
    if (refreshToken)
      response.push(await this.decodeTokenUseCase.run({ token: refreshToken }));
    return buildSuccessResponse(response);
  }

  @Public()
  @Post('sign-out')
  async signOut(@Res() res: Response): Promise<void> {
    setCookieInResponse(res, [
      [CookieNames.COOKIE_ACCESS_TOKEN_NAME, null],
      [CookieNames.COOKIE_REFRESH_TOKEN_NAME, null]
    ]);

    res.send();
  }

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

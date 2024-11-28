import { Controller, Post, Req } from '@nestjs/common';
import { Public, BodyZod } from '@decorators';
import { AuthRequest } from '@_types/AuthRequest';
import { ResponseDTO } from '@_types/ResponseDto';
import { buildSuccessResponse } from '@_utils/ResponseDto';
import { SignInDto } from './Dto';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Public()
  @Post('sign-in')
  async signIn(
    @BodyZod(SignInDto.signInRequestBodyDtoSchema) body: SignInDto.SignInBody,
    @Req() req: AuthRequest
  ): Promise<ResponseDTO<SignInDto.AuthResponseDTO>> {
    console.log(body);
    console.log(req);

    return buildSuccessResponse({
      idToken: ''
    });
  }
}

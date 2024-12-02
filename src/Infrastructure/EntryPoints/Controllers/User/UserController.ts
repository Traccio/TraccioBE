import { Controller, Get, HttpStatus, Param, Request } from '@nestjs/common';
import { AuthRequest } from '~_types/AuthRequest';
import { GetOneUserUseCase } from '~domain/User/UseCases/GetOneUser/GetOneUserUseCase';
import { UserResponseDto } from './Dto';
import { FromUserToUserResponseDto } from './Mapper/UserResponseMapper';
import { SuccessResponseDto } from '~_types/ResponseDto';
import { buildSuccessResponse } from '~_utils/ResponseDto';
import { HttpTraccioException } from '~exceptions';
import { ErrorCode } from '~_types/ErrorCode';

@Controller('users')
export class UserController {
  constructor(private readonly getOneUserUseCase: GetOneUserUseCase) {}

  @Get('me')
  async me(
    @Request() req: AuthRequest
  ): Promise<SuccessResponseDto<UserResponseDto>> {
    const user = await this.getOneUserUseCase.run({
      __by: 'userId',
      userId: req.userId
    });

    if (user === null)
      throw new HttpTraccioException(HttpStatus.NOT_FOUND, {
        description: 'User not found !',
        errorCode: ErrorCode._ERR_USER_NOT_FOUND
      });

    return buildSuccessResponse(FromUserToUserResponseDto(user));
  }

  @Get(':id')
  async getUserFromId(
    @Param('id') userId: string
  ): Promise<SuccessResponseDto<UserResponseDto>> {
    const user = await this.getOneUserUseCase.run({
      __by: 'userId',
      userId
    });

    if (user === null)
      throw new HttpTraccioException(HttpStatus.NOT_FOUND, {
        description: 'User not found !',
        errorCode: ErrorCode._ERR_USER_NOT_FOUND
      });

    return buildSuccessResponse(FromUserToUserResponseDto(user));
  }
}

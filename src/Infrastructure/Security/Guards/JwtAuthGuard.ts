import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/Shared/Decorators/Public/PublicDecorator';
import { AuthRequest } from '~_types/AuthRequest';
import { TokenType } from '~domain/Token/Token';
import { VerifyTokenUseCase } from '~domain/Token/UseCases/VerifyToken/VerifyTokenUseCase';
import { TokenExpiredError } from '@nestjs/jwt';
import { HttpTraccioException } from '~exceptions';
import { ErrorCode } from '~_types/ErrorCode';
import { getCookiesFromRequest } from '~_utils/Cookie';
import { CookieNames } from 'src/Infrastructure/EntryPoints/Controllers/Auth/_Constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly verifyTokenUseCase: VerifyTokenUseCase
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      // check if the route is public
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()]
      );
      if (isPublic) return resolve(true);

      const request: Request & AuthRequest = context
        .switchToHttp()
        .getRequest();

      const tokenAsString = getCookiesFromRequest(
        request,
        CookieNames.COOKIE_ACCESS_TOKEN_NAME
      );

      if (!tokenAsString)
        return reject(
          new HttpTraccioException(HttpStatus.UNAUTHORIZED, {
            description: 'No Token provided !',
            errorCode: ErrorCode._ERR_NO_ACCESS_TOKEN_PROVIDED
          })
        );

      try {
        const token = await this.verifyTokenUseCase.run({
          token: tokenAsString,
          tokenType: TokenType.ACCESS_TOKEN
        });

        // retrieve user from database
        // const user = (
        //   await this.getUserUseCase.run({ userId: payload.userId })
        // ).orElseThrow(new UnauthorizedException());

        // check if the user has one of allowed roles

        request.userId = token.payload.sub;
        request.token = token;
        return resolve(true);
      } catch (exc: unknown) {
        if (exc instanceof TokenExpiredError) {
          return reject(new UnauthorizedException('Token expired !'));
        }

        this.logger.error(exc);
        if (exc instanceof HttpException) {
          reject(
            new HttpException(exc.message, exc.getStatus(), {
              cause: exc.cause
            })
          );
        }

        reject(
          exc instanceof Error
            ? new UnauthorizedException(exc.message)
            : new UnauthorizedException()
        );
      }
    });
  }
}

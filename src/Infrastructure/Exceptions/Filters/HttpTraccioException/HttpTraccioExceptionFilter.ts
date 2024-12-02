import { Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpStatus
} from '@nestjs/common';
import { HttpTraccioException } from '../../Classes/HttpTraccioException';
import { buildErrorResponse } from '~_utils/ResponseDto';
import { Env } from '~_utils/Env';

@Catch(HttpTraccioException)
export class HttpTraccioExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpTraccioExceptionFilter.name);

  constructor() {
    this.logger.log('created! 🎉;');
  }

  catch(exception: HttpTraccioException, host: ArgumentsHost): void {
    this.logger.debug('catched http Traccio exception! 🔥');

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const status: HttpStatus = exception.status;
    const message: string = exception.message;
    const cause: Error | undefined = exception.options.cause;
    const stack: string | undefined = exception.stack;
    const errorCode = exception.options.errorCode;

    const response = buildErrorResponse({
      status,
      message,
      errorCode,
      meta: {
        ...(Env.NODE_ENV === 'development' && { stack: stack }),
        cause: cause
      }
    });

    res.status(status).send(response);
  }
}

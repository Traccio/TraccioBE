import { Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger
} from '@nestjs/common';
import { Env } from '~_utils/Env';
import { buildErrorResponse } from '~_utils/ResponseDto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor() {
    this.logger.log('created! 🎉;');
  }

  catch(exception: HttpException, host: ArgumentsHost): void {
    this.logger.debug('catched http exception! 🔥');

    const exceptionResponse: string | object = exception.getResponse();
    const responseMessage: unknown =
      exceptionResponse instanceof Object
        ? (exceptionResponse as Record<string, unknown>)['message']
        : null;

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const message = exception.message;
    const cause = exception.cause;
    const stack = exception.stack;

    const response = buildErrorResponse({
      status,
      message,
      meta: {
        cause: cause,
        ...(Env.NODE_ENV === 'development' && { stack: stack }),
        ...(!!responseMessage && { info: responseMessage })
      }
    });

    res.status(status).json(response);
  }
}

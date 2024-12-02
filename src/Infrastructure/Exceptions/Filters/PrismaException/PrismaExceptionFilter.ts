import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { buildErrorResponse } from '~_utils/ResponseDto';

const errorCodesMap: Record<
  string,
  { message: string; statusCode: HttpStatus }
> = {
  P2002: {
    message: 'Unique constraint failed.',
    statusCode: HttpStatus.CONFLICT
  },
  P2025: {
    message: 'Not found record with given id.',
    statusCode: HttpStatus.NOT_FOUND
  },
  P2003: {
    message: 'Not found record with given id.',
    statusCode: HttpStatus.BAD_REQUEST
  }
};

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  constructor() {
    this.logger.log('created! 🎉;');
  }

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    this.logger.debug('catched prisma exception! 🔥');
    this.logger.error(exception);

    const code = exception.code;

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status =
      errorCodesMap[code]?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;

    // log error if current prisma error code was not mapped
    if (!errorCodesMap[code]) {
      this.logger.error(
        `no mapped code ${exception.code} in prisma exception! 💣`
      );
      this.logger.error(exception.message);
    }

    const message = errorCodesMap[code]?.message ?? 'Internal server error!';
    const cause: Record<string, unknown> = exception.meta ?? {};

    const response = buildErrorResponse({
      status,
      message,
      meta: {
        ...cause
      }
    });

    res.status(status).json(response);
  }
}

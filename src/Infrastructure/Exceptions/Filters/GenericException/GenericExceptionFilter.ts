import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { buildErrorResponse } from '~_utils/ResponseDto';

@Catch(Error)
export class GenericExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GenericExceptionFilter.name);

  constructor() {
    this.logger.log('created! 🎉;');
  }

  // TODO: log exception trace
  catch(exception: Error, host: ArgumentsHost): void {
    console.log('catched exception! 🔥');
    this.logger.error('exception not handled! 💣');
    this.logger.error(exception);
    this.logger.error(exception.stack);

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const response = buildErrorResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong. Please try again later.'
    });

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
  }
}

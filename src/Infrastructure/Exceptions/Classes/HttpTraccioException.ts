import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '~_types/ErrorCode';

type HttpTraccioExceptionOptions = {
  errorCode?: ErrorCode;
  cause?: Error;
  description?: string;
};

export class HttpTraccioException extends Error {
  private readonly _status: HttpStatus;
  private readonly _options: HttpTraccioExceptionOptions | null;

  constructor(status: HttpStatus, options?: HttpTraccioExceptionOptions) {
    super(options?.description);
    this._status = status;
    this._options = options || null;
  }

  get status(): HttpStatus {
    return this._status;
  }

  get options(): HttpTraccioExceptionOptions | null {
    return this._options;
  }

  public static is(error: Error): error is HttpTraccioException {
    return error instanceof HttpTraccioException;
  }
}
import { Nullable } from '~_types/Nullable';
import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '~_types/ErrorCode';

// Paged Command
export interface PagedCommand {
  pageNumber: number;
  pageSize: number;
}

// ResponseType ( tipo da tornare al frontend generico )
export interface SuccessResponseDto<D> {
  outcome: true;
  data: Nullable<D>;
}
export interface ErrorResponseDto {
  outcome: false;
  error: {
    status: HttpStatus;
    message: Nullable<string>;
    errorCode: ErrorCode;
    meta: Record<PropertyKey, unknown>;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Paged<D extends readonly any[]> {
  data: D;
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PagedResponseDto<D extends readonly any[]> {
  outcome: true;
  data: D;
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export type ResponseDto<D> = SuccessResponseDto<D> | ErrorResponseDto;

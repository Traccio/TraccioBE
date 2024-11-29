import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '~_types/ErrorCode';

// Paged Command
export interface PagedCommand {
  pageNumber: number;
  pageSize: number;
}

// ResponseType ( tipo da tornare al frontend generico )
export interface SuccessResponseDTO<D> {
  outcome: true;
  data: D | null;
}
export interface ErrorResponseDTO {
  outcome: false;
  error: {
    status: HttpStatus;
    message: string | null;
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
export interface PagedResponseDTO<D extends readonly any[]> {
  outcome: true;
  data: D;
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export type ResponseDTO<D> = SuccessResponseDTO<D> | ErrorResponseDTO;

import { Nullable } from '~_types/Nullable';
import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '~_types/ErrorCode';
import {
  ErrorResponseDto,
  PagedResponseDto,
  SuccessResponseDto
} from '~_types/ResponseDto';

export const buildSuccessResponse = <T>(data: T): SuccessResponseDto<T> => {
  return {
    outcome: true,
    data
  };
};

export const buildErrorResponse = (input: {
  status: HttpStatus;
  message?: Nullable<string>;
  errorCode?: ErrorCode;
  meta?: Record<PropertyKey, unknown>;
}): ErrorResponseDto => {
  return {
    outcome: false,
    error: {
      status: input.status,
      message: input.message ?? null,
      errorCode: input.errorCode || ErrorCode._ERR_GENERIC,
      meta: input.meta ?? {}
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildPagedResponseDTO = <T extends readonly any[]>(
  data: T,
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }
): PagedResponseDto<T> => {
  return { outcome: true, data: data, pagination: pagination };
};

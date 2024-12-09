import { Nullable } from '~_types/Nullable';
import { HttpStatus } from '@nestjs/common';
import { HttpTraccioException } from '~exceptions';

export const nonNull = <T>(source: Nullable<T>, exc?: Error): T => {
  if (source === null)
    throw exc ? exc : new HttpTraccioException(HttpStatus.NOT_FOUND);

  return source;
};

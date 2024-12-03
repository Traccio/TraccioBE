import { HttpStatus } from '@nestjs/common';
import { HttpTraccioException } from '~exceptions';

export const nonNull = <T>(source: T | null, exc?: Error): T => {
  if (source === null)
    throw exc ? exc : new HttpTraccioException(HttpStatus.NOT_FOUND);

  return source;
};

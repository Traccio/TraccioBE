import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(
    private schema: ZodSchema,
    private options?: { parseJson: boolean }
  ) {}

  transform(value: unknown): object {
    try {
      const givenValue =
        this.options?.parseJson && typeof value === 'string'
          ? JSON.parse(value)
          : value;
      const parsedValue = this.schema.parse(givenValue);
      return parsedValue;
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.errors);
      }
      throw new BadRequestException('Validation failed');
    }
  }
}

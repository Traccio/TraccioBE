import { Body } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ZodValidationPipe } from '@pipes';

export const BodyZod = (schema: ZodSchema): ParameterDecorator =>
  Body(new ZodValidationPipe(schema));

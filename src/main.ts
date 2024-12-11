import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  GenericExceptionFilter,
  HttpExceptionFilter,
  HttpTraccioExceptionFilter,
  PrismaExceptionFilter
} from '~exceptions/Filters';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new GenericExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new HttpTraccioExceptionFilter());

  await app.listen(3000);
}
bootstrap();

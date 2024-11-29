import { Module } from '@nestjs/common';
import { AuthController } from './Auth/AuthController';
import { DomainModule } from '~domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [AuthController]
})
export class ControllersModule {}

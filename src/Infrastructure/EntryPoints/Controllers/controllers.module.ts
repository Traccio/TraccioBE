import { Module } from '@nestjs/common';
import { AuthController } from './Auth/AuthController';
import { DomainModule } from '~domain/domain.module';
import { UserController } from './User/UserController';

@Module({
  imports: [DomainModule],
  controllers: [AuthController, UserController]
})
export class ControllersModule {}

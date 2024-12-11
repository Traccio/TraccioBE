import { Module } from '@nestjs/common';
import { AuthController } from './Auth/AuthController';
import { DomainModule } from '~domain/domain.module';
import { UserController } from './User/UserController';
import { CategoryController } from './Category/CategoryController';

@Module({
  imports: [DomainModule],
  controllers: [AuthController, UserController, CategoryController]
})
export class ControllersModule {}

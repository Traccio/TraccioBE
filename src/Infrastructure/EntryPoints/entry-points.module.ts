import { Module } from '@nestjs/common';
import { ControllersModule } from './Controllers/controllers.module';

@Module({
  imports: [ControllersModule]
})
export class EntryPointsModule {}

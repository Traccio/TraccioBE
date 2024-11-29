import { Module } from '@nestjs/common';
import { InfrastructureModule } from './Infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: []
})
export class AppModule {}

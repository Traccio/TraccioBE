import { Module } from '@nestjs/common';
import { EntryPointsModule } from './EntryPoints/entry-points.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './Security/Guards/JwtAuthGuard';
import { DomainModule } from '~domain/domain.module';

@Module({
  imports: [EntryPointsModule, DomainModule],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }]
})
export class InfrastructureModule {}

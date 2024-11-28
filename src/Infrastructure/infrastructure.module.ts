import { Module } from '@nestjs/common';
import { EntryPointsModule } from './EntryPoints/entry-points.module';

@Module({ imports: [EntryPointsModule] })
export class InfrastructureModule {}

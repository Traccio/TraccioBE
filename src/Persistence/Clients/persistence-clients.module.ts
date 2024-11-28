import { Module } from '@nestjs/common';
import { PrismaTraccioClient } from './PrismaTraccio/PrismaTraccioClient';

@Module({
  providers: [PrismaTraccioClient],
  exports: [PrismaTraccioClient]
})
export class PersistenceClientsModule {}

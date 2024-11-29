import { ClassProvider, Module } from '@nestjs/common';
import { PersistenceClientsModule } from './Clients/persistence-clients.module';
import { UserPersistenceGateway } from './Dal/User/UserPersistenceGateway';

const providers: ClassProvider[] = [
  { provide: 'UserPersistencePort', useClass: UserPersistenceGateway }
];

@Module({
  imports: [PersistenceClientsModule],
  providers: [...providers],
  exports: [...providers]
})
export class PersistenceModule {}

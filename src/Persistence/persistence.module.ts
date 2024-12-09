import { ClassProvider, Module } from '@nestjs/common';
import { PersistenceClientsModule } from './Clients/persistence-clients.module';
import { UserPersistenceGateway } from './Dal/User/UserPersistenceGateway';
import { CategoryPersistenceGateway } from './Dal/Category/CategoryPersistenceGateway';

const providers: ClassProvider[] = [
  { provide: 'UserPersistencePort', useClass: UserPersistenceGateway },
  { provide: 'CategoryPersistencePort', useClass: CategoryPersistenceGateway }
];

@Module({
  imports: [PersistenceClientsModule],
  providers: [...providers],
  exports: [...providers.map((provider) => provider.provide)]
})
export class PersistenceModule {}

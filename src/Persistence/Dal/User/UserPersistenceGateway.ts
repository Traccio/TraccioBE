import { Nullable } from '~_types/Nullable';
import {
  GetOneUserInput,
  UserPersistencePort
} from '~domain/User/Ports/UserPersistencePort';
import { User } from '~domain/User/User';
import { PersistenceGateway } from '~decorators';
import { PrismaEntities } from 'src/Persistence/Clients/PrismaTraccio/PrismaEntities';
import { PrismaTraccioClient } from 'src/Persistence/Clients/PrismaTraccio/PrismaTraccioClient';
import { FromUserEntityToUserModel } from './UserPersistenceMapper';

@PersistenceGateway
export class UserPersistenceGateway implements UserPersistencePort {
  constructor(private readonly prisma: PrismaTraccioClient) {}

  async getOne(input: GetOneUserInput): Promise<Nullable<User>> {
    const where: PrismaEntities.Prisma.UserWhereUniqueInput =
      input.__by === 'userId'
        ? { Id: input.userId }
        : { Username: input.username };

    const user = await this.prisma.user.findUnique({ where });
    return user && FromUserEntityToUserModel(user);
  }
}

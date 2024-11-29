import {
  GetOneUserInput,
  UserPersistencePort
} from '~domain/User/Ports/UserPersistencePort';
import { User } from '~domain/User/User';
import { PrismaEntities } from 'src/Persistence/Clients/PrismaTraccio/PrismaEntities';
import { PrismaTraccioClient } from 'src/Persistence/Clients/PrismaTraccio/PrismaTraccioClient';
import { FromUserEntityToUser } from './UserPersistenceMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPersistenceGateway implements UserPersistencePort {
  constructor(private readonly prisma: PrismaTraccioClient) {}

  async getOne(input: GetOneUserInput): Promise<User | null> {
    const where: PrismaEntities.Prisma.UserWhereUniqueInput =
      input.__by === 'userId'
        ? { Id: input.userId }
        : { Username: input.username };

    const user = await this.prisma.user.findUnique({ where });
    return user && FromUserEntityToUser(user);
  }
}

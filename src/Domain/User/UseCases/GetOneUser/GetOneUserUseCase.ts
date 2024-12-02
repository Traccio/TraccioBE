import { UseCase } from '~decorators';
import { GetOneUserCommand } from './GetOneUserCommand';
import { User } from '../../User';
import { UserPersistencePort } from '~domain/User/Ports/UserPersistencePort';
import { Inject } from '@nestjs/common';

@UseCase
export class GetOneUserUseCase {
  constructor(
    @Inject('UserPersistencePort')
    private readonly userPersistence: UserPersistencePort
  ) {}

  async run(command: GetOneUserCommand): Promise<User | null> {
    return this.userPersistence.getOne({
      ...command
    });
  }
}

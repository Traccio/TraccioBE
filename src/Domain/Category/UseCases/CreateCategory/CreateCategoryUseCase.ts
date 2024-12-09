import { UseCase } from '~decorators';
import { CreateCategoryCommand } from './CreateCategoryCommand';
import { Category } from '~domain/Category/Category';
import { CategoryPersistencePort } from '~domain/Category/Ports/CategoryPersistencePort';
import { Inject } from '@nestjs/common';

@UseCase
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryPersistencePort')
    private readonly categoryPersistence: CategoryPersistencePort
  ) {}

  async run(command: CreateCategoryCommand): Promise<Category> {
    return this.categoryPersistence.create({
      Name: command.Name,
      Icon: command.Icon,
      Color: command.Color,
      Type: command.Type,
      ValueType: command.ValueType,
      MinValue: command.MinValue,
      MaxValue: command.MaxValue,
      AllowedValues: command.AllowedValues
    });
  }
}

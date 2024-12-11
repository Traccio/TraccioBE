import { UseCase } from '~decorators';
import { Category } from '~domain/Category/Category';
import { CategoryPersistencePort } from '~domain/Category/Ports/CategoryPersistencePort';
import { Inject } from '@nestjs/common';
import { UpdateCategoryCommand } from './UpdateCategoryCommand';

@UseCase
export class UpdateCategoryUseCase {
  constructor(
    @Inject('CategoryPersistencePort')
    private readonly categoryPersistence: CategoryPersistencePort
  ) {}

  async run(command: UpdateCategoryCommand): Promise<Category> {
    return this.categoryPersistence.update({
      CategoryId: command.CategoryId,
      Name: command.Name,
      Icon: command.Icon,
      Color: command.Color,
      MinValue: command.MinValue,
      MaxValue: command.MaxValue,
      AllowedValues: command.AllowedValues
    });
  }
}

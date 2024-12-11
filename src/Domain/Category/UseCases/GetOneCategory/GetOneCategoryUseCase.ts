import { Nullable } from './../../../../Infrastructure/_Types/Nullable';
import { UseCase } from '~decorators';
import { GetOneCategoryCommand } from './GetOneCategoryCommand';
import { Category } from '~domain/Category/Category';
import { CategoryPersistencePort } from '~domain/Category/Ports/CategoryPersistencePort';
import { Inject } from '@nestjs/common';

@UseCase
export class GetOneCategoryUseCase {
  constructor(
    @Inject('CategoryPersistencePort')
    private readonly categoryPersistence: CategoryPersistencePort
  ) {}

  async run(command: GetOneCategoryCommand): Promise<Nullable<Category>> {
    return this.categoryPersistence.getOne({
      __By: command.__By,
      CategoryId: command.CategoryId
    });
  }
}

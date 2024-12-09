import { Inject } from '@nestjs/common';
import { UseCase } from '~decorators';
import { Category } from '~domain/Category/Category';
import { CategoryPersistencePort } from '~domain/Category/Ports/CategoryPersistencePort';

@UseCase
export class FindAllCategoriesUseCase {
  constructor(
    @Inject('CategoryPersistencePort')
    private readonly categoryPersistence: CategoryPersistencePort
  ) {}

  async run(): Promise<Category[]> {
    return this.categoryPersistence.findAll();
  }
}

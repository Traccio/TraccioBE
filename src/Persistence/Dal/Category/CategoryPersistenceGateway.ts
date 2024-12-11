import { PrismaTraccioClient } from 'src/Persistence/Clients/PrismaTraccio/PrismaTraccioClient';
import { PersistenceGateway } from '~decorators';
import { Category } from '~domain/Category/Category';
import {
  CategoryPersistencePort,
  CreateCategoryInput
} from '~domain/Category/Ports/CategoryPersistencePort';
import { FromCategoryEntityToCategoryModel } from './CategoryPersistenceMapper';

@PersistenceGateway
export class CategoryPersistenceGateway implements CategoryPersistencePort {
  constructor(private readonly prisma: PrismaTraccioClient) {}

  async findAll(): Promise<Category[]> {
    const categoryEntities = await this.prisma.categories.findMany();
    return categoryEntities.map(FromCategoryEntityToCategoryModel);
  }

  async create(input: CreateCategoryInput): Promise<Category> {
    const createdCategory = await this.prisma.categories.create({
      data: {
        Name: input.Name,
        Icon: input.Icon,
        Color: input.Color,
        Type: input.Type,
        ValueType: input.ValueType,
        MinValue: input.MinValue,
        MaxValue: input.MaxValue,
        AllowedValues: !input.AllowedValues
          ? null
          : input.AllowedValues.join(',')
      }
    });

    return FromCategoryEntityToCategoryModel(createdCategory);
  }
}

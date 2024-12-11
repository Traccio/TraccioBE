import { Nullable } from '~_types/Nullable';
import { Category } from '../Category';
import { CategoryType, CategoryValueType } from '@prisma/client';

export interface GetOneCategoryInput {
  __By: 'CategoryId';
  CategoryId: string;
}

export interface CreateCategoryInput {
  Name: string;
  Icon: Nullable<string>;
  Color: string;
  Type: CategoryType;
  ValueType: CategoryValueType;
  MinValue: Nullable<number>;
  MaxValue: Nullable<number>;
  AllowedValues: Nullable<string[]>;
}

export interface UpdateCategoryInput {
  CategoryId: string;
  Name: string;
  Icon: Nullable<string>;
  Color: string;
  MinValue: Nullable<number>;
  MaxValue: Nullable<number>;
  AllowedValues: Nullable<string[]>;
}

export interface CategoryPersistencePort {
  findAll(): Promise<Category[]>;
  getOne(input: GetOneCategoryInput): Promise<Nullable<Category>>;
  create(input: CreateCategoryInput): Promise<Category>;
  update(input: UpdateCategoryInput): Promise<Category>;
}

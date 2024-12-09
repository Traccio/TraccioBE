import { CategoryValueType } from '@prisma/client';
import { Nullable } from '~_types/Nullable';
import { CategoryType } from '~domain/Category/Category';

export interface CreateCategoryCommand {
  Name: string;
  Icon: Nullable<string>;
  Color: string;
  Type: CategoryType;
  ValueType: CategoryValueType;
  MinValue: Nullable<number>;
  MaxValue: Nullable<number>;
  AllowedValues: Nullable<string[]>;
}

import { Nullable } from '~_types/Nullable';
import { CategoryType, CategoryValueType } from '~domain/Category/Category';

export class CategoryResponseDto {
  id!: string;
  name!: string;
  icon!: Nullable<string>;
  color!: string;
  type!: CategoryType;
  valueType!: CategoryValueType;
  minValue!: Nullable<number>;
  maxValue!: Nullable<number>;
  allowedValues!: Nullable<string[]>;
}

import { Category } from '~domain/Category/Category';
import { CategoryEntity } from './CategoryEntity';

export const FromCategoryEntityToCategoryModel = (
  source: CategoryEntity
): Category => {
  return {
    Id: source.Id,
    Name: source.Name,
    Icon: source.Icon,
    Color: source.Color,
    Type: source.Type,
    ValueType: source.ValueType,
    MinValue: source.MinValue,
    MaxValue: source.MaxValue,
    AllowedValues: !source.AllowedValues
      ? null
      : source.AllowedValues.split(',')
  };
};

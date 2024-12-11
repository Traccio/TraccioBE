import { Category } from '~domain/Category/Category';
import { CategoryResponseDto } from '../Dto';

export const FromCategoryModelToCategoryResponseDto = (
  source: Category
): CategoryResponseDto => {
  return {
    id: source.Id,
    name: source.Name,
    icon: source.Icon,
    color: source.Color,
    type: source.Type,
    valueType: source.ValueType,
    minValue: source.MinValue,
    maxValue: source.MaxValue,
    allowedValues: source.AllowedValues
  };
};

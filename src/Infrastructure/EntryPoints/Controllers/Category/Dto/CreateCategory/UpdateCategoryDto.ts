import { CategoryValueType } from '@prisma/client';
import { Nullable } from '~_types/Nullable';

export class UpdateCategoryRequestDto {
  name!: string;
  icon!: Nullable<string>;
  color!: string;
  valueType!: CategoryValueType;
  minValue!: Nullable<number>;
  maxValue!: Nullable<number>;
  allowedValues!: Nullable<string[]>;
}

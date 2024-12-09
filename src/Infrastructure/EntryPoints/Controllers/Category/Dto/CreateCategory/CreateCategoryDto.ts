import { CategoryType, CategoryValueType } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { Nullable } from '~_types/Nullable';

export class CreteCategoryRequestDto {
  name!: string;
  icon!: Nullable<string>;
  color!: string;
  @IsEnum(CategoryType)
  type!: CategoryType;
  @IsEnum(CategoryValueType)
  valueType!: CategoryValueType;
  minValue!: Nullable<number>;
  maxValue!: Nullable<number>;
  allowedValues!: Nullable<string[]>;
}

import { Nullable } from '~_types/Nullable';
import { TypeUnionFromConst } from '~_types/UtilsTypes';

export type CategoryType = TypeUnionFromConst<typeof CategoryType>;
export const CategoryType = {
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT'
} as const;

export type CategoryValueType = TypeUnionFromConst<typeof CategoryValueType>;
export const CategoryValueType = {
  NUMERIC: 'NUMERIC',
  BOOLEAN: 'BOOLEAN',
  RANGE: 'RANGE',
  DURATION: 'DURATION',
  PERCENTAGE: 'PERCENTAGE',
  COUNT: 'COUNT',
  LIST: 'LIST',
  TIMESTAMP: 'TIMESTAMP',
  CATEGORICAL: 'CATEGORICAL',
  BINARY: 'BINARY',
  SCORE: 'SCORE'
} as const;

export type Category = {
  Id: string;
  Name: string;
  Icon: Nullable<string>;
  Color: string;
  Type: CategoryType;
  ValueType: CategoryValueType;
  MinValue: Nullable<number>;
  MaxValue: Nullable<number>;
  AllowedValues: Nullable<string[]>;
};

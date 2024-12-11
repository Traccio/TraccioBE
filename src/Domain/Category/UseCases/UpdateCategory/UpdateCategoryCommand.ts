import { Nullable } from '~_types/Nullable';

export interface UpdateCategoryCommand {
  CategoryId: string;
  Name: string;
  Icon: Nullable<string>;
  Color: string;
  MinValue: Nullable<number>;
  MaxValue: Nullable<number>;
  AllowedValues: Nullable<string[]>;
}

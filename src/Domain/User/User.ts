import { TypeUnionFromConst } from '~_types/UtilsTypes';

export type UserStatus = TypeUnionFromConst<typeof UserStatus>;
export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
} as const;

export interface User {
  Id: string;
  Status: UserStatus;
  Username: string;
  Password: string;
  Salt: string;

  CreatedAt: Date;
  UpdatedAt: Date;
}

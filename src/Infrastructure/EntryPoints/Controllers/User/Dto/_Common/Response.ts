import { UserStatus } from '~domain/User/User';

// User
export class UserResponseDto {
  id!: string;
  status!: UserStatus;
  username!: string;
}

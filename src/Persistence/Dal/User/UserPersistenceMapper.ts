import { User } from '~domain/User/User';
import { UserEntity } from './UserEntity';

export const FromUserEntityToUser = (source: UserEntity): User => {
  const fullPassword = source.Password;
  const [Password, Salt] = fullPassword.split('.');

  return {
    Id: source.Id,
    Status: source.Status,
    Username: source.Username,
    Password,
    Salt,

    CreatedAt: source.CreatedAt,
    UpdatedAt: source.UpdatedAt
  };
};

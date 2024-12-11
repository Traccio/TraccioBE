import { User } from '~domain/User/User';
import { UserResponseDto } from '../Dto';

export const FromUserModelToUserResponseDto = (
  source: User
): UserResponseDto => {
  return {
    id: source.Id,
    status: source.Status,
    username: source.Username
  };
};

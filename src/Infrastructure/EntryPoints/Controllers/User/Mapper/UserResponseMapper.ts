import { User } from '~domain/User/User';
import { UserResponseDto } from '../Dto';

export const FromUserToUserResponseDto = (source: User): UserResponseDto => {
  return {
    id: source.Id,
    status: source.Status,
    username: source.Username
  };
};

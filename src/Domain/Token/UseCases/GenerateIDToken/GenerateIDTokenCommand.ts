import { User } from '~domain/User/User';

export interface GenerateIDTokenCommand {
  user: User;
}

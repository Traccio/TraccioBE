import { User } from '../User';

// GetOne
type GetOneUserByUsernameInput = {
  __by: 'username';
  username: string;
};
type GetOneUserByIdInput = {
  __by: 'userId';
  userId: string;
};
export type GetOneUserInput = GetOneUserByUsernameInput | GetOneUserByIdInput;

export interface UserPersistencePort {
  getOne(input: GetOneUserInput): Promise<User | null>;
}

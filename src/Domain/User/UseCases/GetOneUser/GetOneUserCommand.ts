type GetOneUserById = {
  __by: 'userId';
  userId: string;
};
type GetOneUserByUsername = {
  __by: 'username';
  username: string;
};

export type GetOneUserCommand = GetOneUserById | GetOneUserByUsername;

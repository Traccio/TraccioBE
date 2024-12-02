import { Token } from '~domain/Token/Token';

export type AuthRequest = Express.Request & {
  userId: string;
  token: Token;
};

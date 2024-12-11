import { Token } from '~domain/Token/Token';

export interface SignInData {
  idToken: Token;
  accessToken: Token;
  refreshToken: Token;
}

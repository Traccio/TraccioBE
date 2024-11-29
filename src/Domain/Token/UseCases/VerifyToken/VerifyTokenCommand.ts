import { TokenType } from '~domain/Token/Token';

export interface VerifyTokenCommand {
  secret: string;
  tokenType: TokenType;
  token: string;
}

import { TokenType } from '~domain/Token/Token';

export interface VerifyTokenCommand {
  tokenType: TokenType;
  token: string;
}

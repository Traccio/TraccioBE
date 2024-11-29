import { TypeUnionFromConst } from '~_types/UtilsTypes';

export type TokenPayload = {
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
};

export type TokenType = TypeUnionFromConst<typeof TokenType>;
export const TokenType = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  ID_TOKEN: 'ID_TOKEN'
} as const;

export interface Token {
  type: TokenType;
  asString: string;
  payload: TokenPayload;
}

import { IsoString } from '~_types/UtilsTypes';
import { TokenType } from '~domain/Token/Token';

// TokenDetails
export interface TokenDetailsResponseDTO {
  type: TokenType;
  isExpired: boolean;
  expiration: IsoString;
  asString: string;
  payload: {
    iat: number;
    exp: number;
    aud: string;
    iss: string;
    sub: string;
  };
}

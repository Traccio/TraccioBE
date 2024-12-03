export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
export const ErrorCode = {
  _ERR_NO_ACCESS_TOKEN_PROVIDED: '_ERR_NO_ACCESS_TOKEN_PROVIDED',
  _ERR_NO_REFRESH_TOKEN_PROVIDED: '_ERR_NO_REFRESH_TOKEN_PROVIDED',
  _ERR_NO_TOKEN_PROVIDED: '_ERR_NO_TOKEN_PROVIDED',
  _ERR_USER_NOT_FOUND: '_ERR_USER_NOT_FOUND',
  // fallback generic error
  _ERR_GENERIC: '_ERR_GENERIC'
} as const;

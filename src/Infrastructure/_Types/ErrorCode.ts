export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
export const ErrorCode = {
  // fallback generic error
  _ERR_GENERIC: '_ERR_GENERIC'
} as const;

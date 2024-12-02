import { Response } from 'express';

const _isArrayOfArray = (
  input: [string, string] | [string, string][]
): input is [string, string][] => {
  return Array.isArray(input[0]) && typeof input[0] !== 'string';
};

export const setCookieInResponse = (
  res: Response,
  cookie: [string, string] | [string, string][]
): void => {
  const cookies: [string, string][] = _isArrayOfArray(cookie)
    ? cookie
    : [cookie];

  for (const c of cookies) {
    res.cookie(c[0], c[1], {
      sameSite: 'none',
      path: '/',
      domain: 'localhost',
      httpOnly: false,
      secure: false
    });
  }
};

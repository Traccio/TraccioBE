import { Nullable } from '~_types/Nullable';
import { Response } from 'express';

type CookieValue = Nullable<string>;

const _isArrayOfArray = (
  input: [string, CookieValue] | [string, CookieValue][]
): input is [string, CookieValue][] => {
  return Array.isArray(input[0]) && typeof input[0] !== 'string';
};

export const setCookieInResponse = (
  res: Response,
  cookie: [string, CookieValue] | [string, CookieValue][]
): void => {
  const cookies: [string, CookieValue][] = _isArrayOfArray(cookie)
    ? cookie
    : [cookie];

  for (const [name, value] of cookies) {
    const mustDeleteCookie = value === null;

    res.cookie(name, value, {
      sameSite: 'none',
      path: '/',
      domain: 'localhost',
      httpOnly: false,
      secure: false,
      expires: mustDeleteCookie ? new Date() : undefined
    });
  }
};

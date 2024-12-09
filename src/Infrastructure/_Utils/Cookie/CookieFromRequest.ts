import { Nullable } from '~_types/Nullable';
import { Request } from 'express';

export const getCookiesFromRequest = (
  req: Request,
  cookieName: string
): Nullable<string> => {
  const headers = req.headers;
  const rawCookieHeader: string | undefined = headers.cookie;
  if (rawCookieHeader === undefined) return null;

  const cookies = rawCookieHeader.split(';').map((i) => i.trim());
  for (const cookie of cookies) {
    const [name, value]: string[] = cookie.split('=');

    if (!name || !value) return null;
    if (name === cookieName) return value;
  }

  return null;
};

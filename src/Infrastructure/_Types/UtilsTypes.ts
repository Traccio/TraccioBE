export type TypeUnionFromConst<C extends Readonly<Record<string, string>>> =
  C[keyof C];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Class = { new (...args: any[]): any };

// IsoString
export type IsoString = string;

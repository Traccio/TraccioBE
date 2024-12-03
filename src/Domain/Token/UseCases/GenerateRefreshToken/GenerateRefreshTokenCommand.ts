type GenerateRefreshTokenSimpleStrategyCommand = {
  __strategy: 'simple';
  userId: string;
};
type GenerateRefreshTokenRollingStrategyCommand = {
  __strategy: 'rolling';
  userId: string;
  rollingFrom: string; // refresh token used to rolling strategy
};

export type GenerateRefreshCommand =
  | GenerateRefreshTokenSimpleStrategyCommand
  | GenerateRefreshTokenRollingStrategyCommand;

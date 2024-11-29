export interface SignTokenCommand {
  userId: string;
  payload: Record<string, unknown> | null;
  secret: string;
}

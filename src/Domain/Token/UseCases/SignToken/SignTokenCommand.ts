import { Nullable } from '~_types/Nullable';
export interface SignTokenCommand {
  userId: string;
  payload: Nullable<Record<string, unknown>>;
  secret: string;
  expireInSeconds: number;
}

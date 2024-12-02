import { z } from 'zod';

// Body
export const signInRequestBodyDtoSchema = z.object({
  username: z.string(),
  passwords: z.tuple([z.string(), z.string()])
});
export type SignInBody = z.infer<typeof signInRequestBodyDtoSchema>;

import { z } from 'zod';

// Body
export const signInRequestBodyDtoSchema = z.object({
  email: z.string().email(),
  passwords: z.array(z.string()).length(2)
});
export type SignInBody = z.infer<typeof signInRequestBodyDtoSchema>;

// Response
export interface AuthResponseDTO {
  idToken: string;
}

import { z } from "zod";

export interface signupInputDTO{
    name: string,
    email: string,
    password: string
}

export interface signupOutputDTO {
    message: string;
    token: string;
}

export const signupScheme = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email().min(1).max(100),
    password: z
      .string()
      .regex(
        new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g),
        "The password must have 8 to 12 character, with uppercase and lowercase letter. Must to be minimum of one number and one character special"
      )
      .min(1)
      .max(100),
});
import { z } from "zod"

export const logInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z.string()
    .min(4, "Username must be at least 4 characters")
    .max(15, "Username must not exceed 15 characters")
    .regex(/^[A-Za-z]+$/, "Username must contain only letters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

"use client";

import { z } from "zod";

export const formSchema = z
  .object({
    username: z
      .string()
      .min(8, { message: "Username must be at least 8 characters." })
      .regex(/^[^\d]/, { message: "Username cannot start with a number." }),
    email: z.string().email({ message: "Enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must include at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must include at least one lowercase letter.",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must include at least one special character.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "This field can't be empty" }),
    sellPrivacy: z.literal(true, {
      errorMap: () => ({ message: "Come on, everyone's is doing it." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

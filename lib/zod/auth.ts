import z from "zod";

export const AUTH_SCHEMA = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.email({ error: "Invalid email format" }).min(1, "Email is required"),
  signup_password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  signin_password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required"),
});

export const LOGIN_SCHEMA = AUTH_SCHEMA.pick({
  email: true,
  signin_password: true,
});

export const SIGNUP_SCHEMA = AUTH_SCHEMA.omit({
  signin_password: true,
});

export const FORGOT_PASSWORD_SCHEMA = AUTH_SCHEMA.pick({ email: true });

export const RESET_PASSWORD_SCHEMA = z
  .object({
    password: z
      .string({ error: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({ error: "Please confirm your password" })
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

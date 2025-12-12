import z from "zod";

export const AUTH_SCHEMA = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string({ error: "Email is required" }).min(1, "Email is required"),
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

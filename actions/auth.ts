"use server";

import { stackServerApp } from "@/stack/server";
import { z } from "zod";

const LOGIN_SCHEMA = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const SIGNUP_SCHEMA = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const login = async (_: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const formParsed = await LOGIN_SCHEMA.safeParseAsync({ email, password });

  if (!formParsed.success) {
    const flattenedErrors = z.flattenError(formParsed.error);

    return {
      status: "error",
      data: null,
      errors: {
        email: flattenedErrors.fieldErrors.email?.[0] || null,
        password: flattenedErrors.fieldErrors.password?.[0] || null,
      },
      fields: {
        email,
        password,
      },
    };
  }

  const result = await stackServerApp.signInWithCredential({
    email,
    password,
  });

  if (result.status === "error") {
    return {
      status: "error",
      data: null,
      errors: result.error,
      fields: {
        email,
        password,
      },
    };
  }

  return {
    status: "success",
    data: null,
    errors: null,
    fields: {
      email: "",
      password: "",
    },
  };
};

export const signup = async (_: any, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const formParsed = await SIGNUP_SCHEMA.safeParseAsync({
    name,
    email,
    password,
  });

  if (!formParsed.success) {
    // Use z.flattenError to get a proper error structure
    const flattenedErrors = z.flattenError(formParsed.error);

    return {
      status: "error",
      data: null,
      errors: {
        name: flattenedErrors.fieldErrors.name?.[0] || null,
        email: flattenedErrors.fieldErrors.email?.[0] || null,
        password: flattenedErrors.fieldErrors.password?.[0] || null,
      },
      fields: {
        name,
        email,
        password,
      },
    };
  }

  const result = await stackServerApp.signUpWithCredential({
    email,
    password,
    verificationCallbackUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/`,
  });

  if (result.status === "error") {
    return {
      status: "error",
      data: null,
      errors: result.error,
      fields: {
        name,
        email,
        password,
      },
    };
  }

  return {
    status: "success",
    data: null,
    errors: null,
    fields: {
      name: "",
      email: "",
      password: "",
    },
  };
};

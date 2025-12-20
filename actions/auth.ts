"use server";

import { LOGIN_SCHEMA, SIGNUP_SCHEMA } from "@/lib/zod/auth";
import { zodFlattenError } from "@/lib/zod/utils";
import { redirect } from "next/navigation";
import { authService } from "@/lib/dal/auth";

export type SIGNIN_FORM_STATE = {
  status: "idle" | "pending" | "success" | "error";
  errors?: Record<string, string> | null;
  fields?: {
    email: string;
    password: string;
  };
};

export const login = async (
  _: any,
  formData: FormData,
): Promise<SIGNIN_FORM_STATE> => {
  const email = formData.get("email") as string;
  const signin_password = formData.get("password") as string;

  const formParsed = await LOGIN_SCHEMA.safeParseAsync({
    email,
    signin_password,
  });

  if (!formParsed.success) {
    const flattenedErrors = zodFlattenError(formParsed.error);

    return {
      status: "error",
      errors: {
        email: flattenedErrors.fieldErrors.email?.[0] || "",
        password: flattenedErrors.fieldErrors.signin_password?.[0] || "",
      },
      fields: {
        email,
        password: signin_password,
      },
    };
  }

  try {
    await authService.signIn({
      email,
      password: signin_password,
    });

    return {
      status: "success",
      errors: null,
      fields: {
        email: "",
        password: "",
      },
    };
  } catch (error) {
    // Capturar excepciones inesperadas
    console.error("Unexpected login error:", error);

    return {
      status: "error",
      errors: {
        general:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      },
      fields: {
        email,
        password: signin_password,
      },
    };
  }
};

export type SIGNUP_FORM_STATE = {
  status: "idle" | "pending" | "success" | "error";
  errors?: Record<string, string> | null;
  fields?: {
    name: string;
    email: string;
    password: string;
  };
};

export const signup = async (
  _: any,
  formData: FormData,
): Promise<SIGNUP_FORM_STATE> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const signup_password = formData.get("password") as string;

  // Validación con Zod
  const formParsed = await SIGNUP_SCHEMA.safeParseAsync({
    name,
    email,
    signup_password,
  });

  if (!formParsed.success) {
    const flattenedErrors = zodFlattenError(formParsed.error);

    return {
      status: "error",
      errors: {
        name: flattenedErrors.fieldErrors.name?.[0] || "",
        email: flattenedErrors.fieldErrors.email?.[0] || "",
        password: flattenedErrors.fieldErrors.signup_password?.[0] || "",
      },
      fields: {
        name,
        email,
        password: signup_password,
      },
    };
  }

  try {
    await authService.signUp({
      name,
      email,
      password: signup_password,
    });

    return {
      status: "success",
      errors: null,
      fields: {
        name: "",
        email: "",
        password: "",
      },
    };
  } catch (error) {
    // Capturar excepciones inesperadas
    console.error("Unexpected signup error:", error);

    return {
      status: "error",
      errors: {
        general:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during registration.",
      },
      fields: {
        name,
        email,
        password: signup_password,
      },
    };
  }
};

export const logout = async () => {
  await authService.signOut();
  redirect("/signin");
};

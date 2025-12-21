"use server";

import {
  LOGIN_SCHEMA,
  SIGNUP_SCHEMA,
  FORGOT_PASSWORD_SCHEMA,
  RESET_PASSWORD_SCHEMA,
} from "@/lib/zod/auth";
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

export type FORGOT_PASSWORD_FORM_STATE = {
  status: "idle" | "pending" | "success" | "error";
  errors?: Record<string, string> | null;
  fields?: {
    email: string;
  };
};

export const forgotPassword = async (
  _: any,
  formData: FormData,
): Promise<FORGOT_PASSWORD_FORM_STATE> => {
  const email = formData.get("email") as string;

  const formParsed = await FORGOT_PASSWORD_SCHEMA.safeParseAsync({
    email,
  });

  if (!formParsed.success) {
    const flattenedErrors = zodFlattenError(formParsed.error);

    return {
      status: "error",
      errors: {
        email: flattenedErrors.fieldErrors.email?.[0] || "",
      },
      fields: {
        email,
      },
    };
  }

  try {
    await authService.forgotPassword({ email });

    return {
      status: "success",
      errors: null,
      fields: {
        email: "",
      },
    };
  } catch (error) {
    console.error("Unexpected forgot password error:", error);

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
      },
    };
  }
};

export type RESET_PASSWORD_FORM_STATE = {
  status: "idle" | "pending" | "success" | "error";
  errors?: Record<string, string> | null;
  fields?: {
    password: string;
    confirmPassword: string;
  };
};

export const resetPassword = async (
  _: any,
  formData: FormData,
): Promise<RESET_PASSWORD_FORM_STATE> => {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const token = formData.get("token") as string;

  if (!token) {
    return {
      status: "error",
      errors: {
        general:
          "Invalid or missing reset token. Please request a new password reset link.",
      },
      fields: {
        password: "",
        confirmPassword: "",
      },
    };
  }

  const formParsed = await RESET_PASSWORD_SCHEMA.safeParseAsync({
    password,
    confirmPassword,
  });

  if (!formParsed.success) {
    const flattenedErrors = zodFlattenError(formParsed.error);

    return {
      status: "error",
      errors: {
        password: flattenedErrors.fieldErrors.password?.[0] || "",
        confirmPassword: flattenedErrors.fieldErrors.confirmPassword?.[0] || "",
      },
      fields: {
        password,
        confirmPassword,
      },
    };
  }

  try {
    await authService.resetPassword({
      newPassword: password,
      token,
    });

    return {
      status: "success",
      errors: null,
      fields: {
        password: "",
        confirmPassword: "",
      },
    };
  } catch (error) {
    console.error("Unexpected reset password error:", error);

    return {
      status: "error",
      errors: {
        general:
          error instanceof Error
            ? error.message
            : "Failed to reset password. The link may have expired.",
      },
      fields: {
        password,
        confirmPassword,
      },
    };
  }
};

export const loginAnonymous = async () => {
  await authService.signInAnonymous();
};

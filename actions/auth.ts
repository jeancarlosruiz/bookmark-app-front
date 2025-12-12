"use server";

import { stackServerApp } from "@/stack/server";
import { LOGIN_SCHEMA, SIGNUP_SCHEMA } from "@/lib/zod/auth";
import { zodFlattenError } from "@/lib/zod/utils";

export const login = async (_: any, formData: FormData) => {
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
      data: null,
      errors: {
        email: flattenedErrors.fieldErrors.email?.[0] || null,
        password: flattenedErrors.fieldErrors.signin_password?.[0] || null,
      },
      fields: {
        email,
        password: signin_password,
      },
    };
  }

  const result = await stackServerApp.signInWithCredential({
    email,
    password: signin_password,
  });

  if (result.status === "error") {
    return {
      status: "error",
      data: null,
      errors: result.error,
      fields: {
        email,
        password: signin_password,
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
  const signup_password = formData.get("password") as string;

  const formParsed = await SIGNUP_SCHEMA.safeParseAsync({
    name,
    email,
    password: signup_password,
  });

  if (!formParsed.success) {
    // Use z.flattenError to get a proper error structure
    const flattenedErrors = zodFlattenError(formParsed.error);

    return {
      status: "error",
      data: null,
      errors: {
        name: flattenedErrors.fieldErrors.name?.[0] || null,
        email: flattenedErrors.fieldErrors.email?.[0] || null,
        password: flattenedErrors.fieldErrors.signup_password?.[0] || null,
      },
      fields: {
        name,
        email,
        password: signup_password,
      },
    };
  }

  const result = await stackServerApp.signUpWithCredential({
    email,
    password: signup_password,
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
        password: signup_password,
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

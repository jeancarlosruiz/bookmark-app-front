"use server";

import { stackServerApp } from "@/stack/server";
import { z } from "zod";

const testObj = {
  email: "jeancarlosruizv@gmail.com",
  password: "Jc10221301@",
};

const LOGIN_SCHEMA = z.object({
  email: z.string({ error: "Email is required" }),
  password: z.string({ error: "Password is required" }),
});

export const login = async (_: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const formParsed = await LOGIN_SCHEMA.safeParseAsync({ email, password });

  //corregir esto

  if (!formParsed.success) {
    const fieldErrors = formParsed.error!.issues;

    console.log({ fieldErrors });

    return {
      status: "error",
      data: null,
      errors: {
        email: fieldErrors[0]?.message || null,
        password: fieldErrors[1]?.message || null,
      },
      fields: {
        email,
        password,
      },
    };
  }

  console.log("Llegue aqui");
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
  try {
    const result = await stackServerApp.signUpWithCredential({
      ...testObj,
      verificationCallbackUrl: `http://localhost:3001/`,
    });

    console.log({ result });
  } catch (error) {
    console.log({ error });
  }
};

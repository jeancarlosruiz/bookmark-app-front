"use server";

import { stackServerApp } from "@/stack/server";

export const login = async (_: any, formData: FormData) => {
  try {
    // await stackServerApp.signInWithCredential({});
  } catch (error) {}
};

export const signup = async (_: any, formData: FormData) => {
  try {
    const result = await stackServerApp.signUpWithCredential({
      email: "test@test.com",
      password: "123456789",
      verificationCallbackUrl: undefined,
    });

    console.log({ result });
  } catch (error) {
    console.log({ error });
  }
};

"use server";

import { stackServerApp } from "@/stack/server";

const testObj = {
  email: "jeancarlosruizv@gmail.com",
  password: "Jc10221301@",
};

export const login = async (_: any, formData: FormData) => {
  try {
    const result = await stackServerApp.signInWithCredential(testObj);

    console.log(result);
    return result;
  } catch (error) {}
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

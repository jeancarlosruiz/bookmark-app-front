import { headers } from "next/headers";
import { auth } from "../auth/auth";

export const authService = {
  async signIn({ email, password }: { email: string; password: string }) {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });
  },

  async signUp({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });
  },

  async signOut() {
    await auth.api.signOut({
      headers: await headers(),
    });
  },
};

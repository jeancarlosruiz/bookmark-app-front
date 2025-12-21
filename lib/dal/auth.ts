import { headers } from "next/headers";
import { auth } from "../auth/better-auth";
import { getSessionCookie } from "better-auth/cookies";
import { NextRequest } from "next/server";

export const authService = {
  async signIn({ email, password }: { email: string; password: string }) {
    return await auth.api.signInEmail({
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
    return await auth.api.signUpEmail({
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

  async forgotPassword({ email }: { email: string }) {
    return await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "/reset-password",
      },
      headers: await headers(),
    });
  },

  async resetPassword({
    newPassword,
    token,
  }: {
    newPassword: string;
    token: string;
  }) {
    return await auth.api.resetPassword({
      body: {
        newPassword,
        token,
      },
      headers: await headers(),
    });
  },

  async signInAnonymous() {
    return await auth.api.signInAnonymous();
  },

  async signInGoogleProvider() {
    return await auth.api.signInSocial({
      body: {
        provider: "google",
      },
      headers: await headers(),
    });
  },

  async getCurrentUser() {
    return await auth.api.getSession({
      headers: await headers(),
    });
  },

  async getUserToken() {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    return token;
  },

  async hasUserCookies(req: NextRequest) {
    return getSessionCookie(req);
  },
};

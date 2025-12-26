"use client";

import { createAuthClient } from "better-auth/react";
import { anonymousClient, jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
  plugins: [anonymousClient(), jwtClient()],
});

export const signInGoogleClient = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};

export const { useSession, signOut } = authClient;

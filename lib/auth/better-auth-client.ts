"use client";

import { createAuthClient } from "better-auth/react";
import { anonymousClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [anonymousClient()],
});

export const signInGoogleClient = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};

export const { useSession } = authClient;

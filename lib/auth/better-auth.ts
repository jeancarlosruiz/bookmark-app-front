import { betterAuth } from "better-auth";
import { anonymous, jwt } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { APIError } from "better-auth/api";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "@/lib/email/resend";
import { cookies, headers } from "next/headers";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
      jwks: schema.jwks,
    },
  }),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["email-password", "google"],
      allowDifferentEmails: true, // Allow linking accounts with different emails
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      // Void the promise to prevent timing attacks
      void sendPasswordResetEmail(user.email, url, user.name || undefined);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      // Void the promise to prevent timing attacks
      void sendVerificationEmail(user.email, url, user.name || undefined);
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days (must match or be less than GO backend)
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  plugins: [
    anonymous({
      // Callback executed when anonymous user links account (signs in/up)
      onLinkAccount: async ({ anonymousUser, newUser, ctx }) => {
        const { token } = await auth.api.getToken({
          headers: await headers(),
        });

        try {
          const response = await fetch(
            `${process.env.API_URL}/internal/migrate`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Internal-API-Key": process.env.INTERNAL_API_KEY!,
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                anonymous_user_id: anonymousUser.user.id,
                new_user_id: newUser.user.id,
              }),
            },
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Migration failed:", {
              status: response.status,
              statusText: response.statusText,
              error: errorText,
            });

            // Throw APIError to prevent account linking
            // This keeps the user as anonymous and allows them to retry
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message:
                "Failed to migrate your data. Please try again or contact support.",
            });
          }

          // Migration successful
          const result = await response.json();
          console.log("✅ Migration successful:", result);

          // Store migration result in cookie for client-side toast notification
          const cookieStore = await cookies();
          cookieStore.set("migration_success", JSON.stringify(result.data), {
            httpOnly: false,
            maxAge: 60, // 60 seconds - short-lived for one-time notification
            path: "/",
            sameSite: "lax",
          });
        } catch (error) {
          console.error("❌ Migration error:", error);

          // If it's already an APIError, re-throw it
          if (error instanceof APIError) {
            throw error;
          }

          // Network or unexpected errors
          throw new APIError("INTERNAL_SERVER_ERROR", {
            message:
              "An unexpected error occurred during sign in. Please try again.",
          });
        }
      },
    }),
    jwt({
      jwks: {
        keyPairConfig: {
          alg: "EdDSA",
          crv: "Ed25519",
        },
        rotationInterval: 60 * 60 * 24 * 30, // 30 days
        gracePeriod: 60 * 60 * 24 * 7, // 7 days for key transition
      },
      jwt: {
        expirationTime: "7d", // Match session expiration
        definePayload: ({ user }) => ({
          user_id: user.id, // Backend Go expects this claim
          email: user.email,
          name: user.name,
        }),
      },
    }),
    nextCookies(), // IMPORTANT: Must be the last plugin
  ],
});

export type Session = typeof auth.$Infer.Session;

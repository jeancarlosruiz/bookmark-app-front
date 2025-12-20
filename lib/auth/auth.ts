import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET is required. This should match JWT_SECRET in your GO backend.",
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      // TODO: Implement email sending
      console.log(`Password reset URL for ${user.email}: ${url}`);
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

  advanced: {
    // generateId: () => crypto.randomUUID(),
  },

  plugins: [
    nextCookies(), // IMPORTANT: Must be the last plugin
  ],
});

export type Session = typeof auth.$Infer.Session;

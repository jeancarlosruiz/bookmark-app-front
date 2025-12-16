// auth.ts
import { createAuthClient } from "@neondatabase/neon-auth-next";

export const authClient = createAuthClient({
  url: process.env.NEXT_PUBLIC_NEON_AUTH_URL!,
});

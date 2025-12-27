/**
 * Environment Configuration & Validation
 *
 * IMPORTANT: This module only validates environment variables in DEVELOPMENT mode
 * and only on the SERVER SIDE to prevent issues with Next.js client-side builds.
 *
 * In production, environment variables are assumed to be correctly configured
 * by your hosting platform (Vercel, Railway, etc.).
 *
 * Usage:
 * ```ts
 * import { env } from "@/lib/config/env";
 *
 * const apiUrl = env.API_URL; // Server-side only
 * const publicUrl = env.NEXT_PUBLIC_API_URL; // Available everywhere
 * ```
 */

// Type-safe environment variable schema
interface EnvSchema {
  // Database
  DATABASE_URL: string;

  // Better Auth
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  NEXT_PUBLIC_BETTER_AUTH_URL: string;

  // Google OAuth
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;

  // Email (Resend)
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;

  // Backend API
  API_URL: string;
  NEXT_PUBLIC_API_URL: string;

  // Node environment
  NODE_ENV: "development" | "production" | "test";
}

/**
 * Validates that a URL is properly formatted
 */
function validateURL(url: string, name: string): void {
  try {
    const parsedUrl = new URL(url);

    // Ensure it uses a valid protocol
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error(
        `${name} must use http:// or https:// protocol (got: ${parsedUrl.protocol})`,
      );
    }
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(`${name} is not a valid URL: "${url}"`);
    }
    throw error;
  }
}

/**
 * Validates that a string is non-empty
 */
function validateNonEmpty(value: string | undefined, name: string): string {
  if (!value || value.trim() === "") {
    throw new Error(
      `${name} is required but not defined. Check your .env.local file.`,
    );
  }
  return value;
}

/**
 * Validates all environment variables
 * Only runs in development mode and on the server side
 */
function validateEnv(): EnvSchema {
  // Skip validation if:
  // 1. Not in development mode (production handles env vars via platform)
  // 2. Running on client side (browser - can't access server-only vars)
  const isServer = typeof window === "undefined";
  const isDevelopment = process.env.NODE_ENV === "development";

  if (!isDevelopment || !isServer) {
    // In production or on client, return env vars without validation
    return {
      DATABASE_URL: process.env.DATABASE_URL || "",
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || "",
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "",
      NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "",
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
      RESEND_API_KEY: process.env.RESEND_API_KEY || "",
      RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || "",
      API_URL: process.env.API_URL || "",
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "",
      NODE_ENV: (process.env.NODE_ENV as EnvSchema["NODE_ENV"]) || "development",
    };
  }

  const errors: string[] = [];

  // Helper to validate and collect errors
  const validate = (validator: () => void, errorMessage: string): void => {
    try {
      validator();
    } catch (error) {
      errors.push(error instanceof Error ? error.message : errorMessage);
    }
  };

  // Validate DATABASE_URL
  validate(
    () => validateNonEmpty(process.env.DATABASE_URL, "DATABASE_URL"),
    "DATABASE_URL validation failed",
  );

  // Validate Better Auth
  validate(
    () =>
      validateNonEmpty(process.env.BETTER_AUTH_SECRET, "BETTER_AUTH_SECRET"),
    "BETTER_AUTH_SECRET validation failed",
  );
  validate(() => {
    const url = validateNonEmpty(
      process.env.BETTER_AUTH_URL,
      "BETTER_AUTH_URL",
    );
    validateURL(url, "BETTER_AUTH_URL");
  }, "BETTER_AUTH_URL validation failed");
  validate(() => {
    const url = validateNonEmpty(
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
      "NEXT_PUBLIC_BETTER_AUTH_URL",
    );
    validateURL(url, "NEXT_PUBLIC_BETTER_AUTH_URL");
  }, "NEXT_PUBLIC_BETTER_AUTH_URL validation failed");

  // Validate Google OAuth
  validate(
    () => validateNonEmpty(process.env.GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_ID"),
    "GOOGLE_CLIENT_ID validation failed",
  );
  validate(
    () =>
      validateNonEmpty(
        process.env.GOOGLE_CLIENT_SECRET,
        "GOOGLE_CLIENT_SECRET",
      ),
    "GOOGLE_CLIENT_SECRET validation failed",
  );

  // Validate Email (Resend)
  validate(
    () => validateNonEmpty(process.env.RESEND_API_KEY, "RESEND_API_KEY"),
    "RESEND_API_KEY validation failed",
  );
  validate(
    () => validateNonEmpty(process.env.RESEND_FROM_EMAIL, "RESEND_FROM_EMAIL"),
    "RESEND_FROM_EMAIL validation failed",
  );

  // Validate Backend API URLs
  validate(() => {
    const url = validateNonEmpty(process.env.API_URL, "API_URL");
    validateURL(url, "API_URL");
  }, "API_URL validation failed");
  validate(() => {
    const url = validateNonEmpty(
      process.env.NEXT_PUBLIC_API_URL,
      "NEXT_PUBLIC_API_URL",
    );
    validateURL(url, "NEXT_PUBLIC_API_URL");
  }, "NEXT_PUBLIC_API_URL validation failed");

  // If there are any errors, throw them all at once (DEVELOPMENT ONLY)
  if (errors.length > 0) {
    console.error(
      `\n❌ Environment validation failed in DEVELOPMENT:\n\n${errors.map((e, i) => `${i + 1}. ${e}`).join("\n")}\n\nPlease check your .env.local file and ensure all required variables are set correctly.\n`,
    );
    throw new Error(
      `Environment validation failed:\n\n${errors.map((e, i) => `${i + 1}. ${e}`).join("\n")}\n\nPlease check your .env.local file and ensure all required variables are set correctly.`,
    );
  }

  console.log("✅ All environment variables validated successfully (DEVELOPMENT)");

  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL!,
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    RESEND_API_KEY: process.env.RESEND_API_KEY!,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL!,
    API_URL: process.env.API_URL!,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL!,
    NODE_ENV: (process.env.NODE_ENV as EnvSchema["NODE_ENV"]) || "development",
  };
}

// Validate and export environment variables
export const env = validateEnv();

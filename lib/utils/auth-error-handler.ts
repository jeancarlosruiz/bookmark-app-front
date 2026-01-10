/**
 * Better Auth Error Handler
 *
 * Sanitizes and maps Better Auth error codes to user-friendly messages.
 * Prevents exposing sensitive system/server errors to the client.
 */

export interface BetterAuthError {
  message?: string;
  code?: string;
  status?: number;
  statusText?: string;
}

/**
 * Map of Better Auth error codes to user-friendly messages.
 * Only includes errors that are safe to show to end users.
 */
const SAFE_ERROR_MESSAGES: Record<string, string> = {
  // Authentication errors
  USER_ALREADY_EXISTS: "An account with this email already exists. Please sign in instead.",
  INVALID_EMAIL_OR_PASSWORD: "Invalid email or password. Please try again.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PASSWORD: "Password does not meet requirements.",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters long.",
  PASSWORD_TOO_LONG: "Password is too long.",
  PASSWORD_COMPROMISED: "This password has been compromised. Please choose a more secure password.",

  // Email verification errors
  EMAIL_NOT_VERIFIED: "Please verify your email address before signing in. Check your inbox for the verification link.",
  VERIFICATION_TOKEN_EXPIRED: "Verification link has expired. Please request a new one.",
  INVALID_VERIFICATION_TOKEN: "Invalid verification link. Please request a new one.",

  // Session errors
  SESSION_EXPIRED: "Your session has expired. Please sign in again.",
  INVALID_SESSION: "Invalid session. Please sign in again.",

  // OAuth/Social errors
  OAUTH_ERROR: "Failed to authenticate with the provider. Please try again.",
  OAUTH_ACCOUNT_NOT_LINKED: "This account is not linked. Please sign in with a different method.",

  // Rate limiting
  TOO_MANY_REQUESTS: "Too many attempts. Please try again later.",

  // Account errors
  ACCOUNT_NOT_FOUND: "Account not found. Please check your credentials.",
  ACCOUNT_DISABLED: "Your account has been disabled. Please contact support.",
};

/**
 * HTTP status code to generic error message mapping.
 * Used as fallback when error code is not available.
 */
const STATUS_ERROR_MESSAGES: Record<number, string> = {
  400: "Invalid request. Please check your information and try again.",
  401: "Authentication failed. Please check your credentials.",
  403: "Access denied. Please verify your email address or contact support.",
  404: "Resource not found. Please try again.",
  409: "Conflict. An account with this email may already exist.",
  429: "Too many requests. Please try again later.",
  500: "Server error. Please try again later.",
  503: "Service temporarily unavailable. Please try again later.",
};

/**
 * Default error messages for different authentication flows.
 */
const DEFAULT_ERROR_MESSAGES = {
  SIGNIN: "Failed to sign in. Please check your credentials and try again.",
  SIGNUP: "Failed to create account. Please try again.",
  GOOGLE_SIGNIN: "Failed to sign in with Google. Please try again.",
  GUEST_MODE: "Failed to enter guest mode. Please try again.",
  GENERIC: "An error occurred. Please try again.",
};

/**
 * Sanitizes Better Auth error and returns a safe user-friendly message.
 *
 * @param error - Better Auth error object
 * @param context - Context of the error (signin, signup, google_signin, guest_mode)
 * @returns Safe, user-friendly error message
 */
export function getSafeErrorMessage(
  error: unknown,
  context: "signin" | "signup" | "google_signin" | "guest_mode" = "signin"
): string {
  // Handle null/undefined
  if (!error) {
    return DEFAULT_ERROR_MESSAGES.GENERIC;
  }

  // Handle Better Auth error object
  if (typeof error === "object" && error !== null) {
    const authError = error as BetterAuthError;

    // Priority 1: Check for error code and map to safe message
    if (authError.code && authError.code in SAFE_ERROR_MESSAGES) {
      return SAFE_ERROR_MESSAGES[authError.code];
    }

    // Priority 2: Check HTTP status code for specific handling
    if (authError.status) {
      // 403 often means email not verified
      if (authError.status === 403) {
        return SAFE_ERROR_MESSAGES.EMAIL_NOT_VERIFIED;
      }

      // Use status-based message if available
      if (authError.status in STATUS_ERROR_MESSAGES) {
        return STATUS_ERROR_MESSAGES[authError.status];
      }
    }

    // Priority 3: For known safe messages from Better Auth, return them
    // These are messages that Better Auth explicitly returns for user-facing errors
    if (authError.message) {
      const msg = authError.message.toLowerCase();

      // Known safe patterns from Better Auth
      if (
        msg.includes("invalid email or password") ||
        msg.includes("user already exists") ||
        msg.includes("email not verified") ||
        msg.includes("password") ||
        msg.includes("email")
      ) {
        return authError.message;
      }
    }
  }

  // Priority 4: Return context-specific default message
  switch (context) {
    case "signup":
      return DEFAULT_ERROR_MESSAGES.SIGNUP;
    case "google_signin":
      return DEFAULT_ERROR_MESSAGES.GOOGLE_SIGNIN;
    case "guest_mode":
      return DEFAULT_ERROR_MESSAGES.GUEST_MODE;
    case "signin":
    default:
      return DEFAULT_ERROR_MESSAGES.SIGNIN;
  }
}

/**
 * Logs detailed error information for debugging (server-side or development only).
 *
 * @param error - The error object
 * @param context - Context where the error occurred
 */
export function logAuthError(error: unknown, context: string): void {
  if (process.env.NODE_ENV === "development") {
    console.error(`[Auth Error - ${context}]:`, {
      error,
      timestamp: new Date().toISOString(),
    });
  }
}

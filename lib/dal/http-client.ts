import { authService } from "./auth";

/**
 * Get the appropriate API URL based on execution context
 * Server-side: Use API_URL
 * Client-side: Use NEXT_PUBLIC_API_URL
 */
function getBaseURL(): string {
  // Server-side execution (Node.js)
  if (typeof window === "undefined") {
    const url = `${process.env.API_URL}/api`;
    if (!url) {
      throw new Error(
        "API_URL environment variable is not defined. Check your .env.local file.",
      );
    }
    // Validate URL format
    try {
      new URL(url);
      return url;
    } catch {
      throw new Error(
        `Invalid API_URL format: "${url}". Must be a valid URL (e.g., https://example.com/api)`,
      );
    }
  }

  // Client-side execution (browser)
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_API_URL environment variable is not defined. Check your .env.local file.",
    );
  }
  // Validate URL format
  try {
    new URL(url);
    return url;
  } catch {
    throw new Error(
      `Invalid NEXT_PUBLIC_API_URL format: "${url}". Must be a valid URL (e.g., https://example.com/api)`,
    );
  }
}

/**
 * HTTP Client Configuration
 */
const HTTP_CONFIG = {
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
} as const;

/**
 * Custom error class for HTTP errors
 */
export class HTTPError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
    public url: string,
  ) {
    super(message);
    this.name = "HTTPError";
  }
}

/**
 * HTTP Client options
 */
export interface HTTPClientOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
  requireAuth?: boolean; // Whether this request requires authentication (default: true)
  timeout?: number;
}

/**
 * Creates an authenticated fetch client with automatic token injection
 * and centralized error handling.
 *
 * This client automatically:
 * - Adds the JWT token from Better Auth to requests
 * - Handles timeouts
 * - Provides consistent error handling
 * - Supports both absolute and relative URLs
 *
 * @example
 * ```ts
 * // In a Server Action or Server Component
 * const data = await httpClient.get('/bookmark/user/123');
 * const newBookmark = await httpClient.post('/bookmark', { title: 'Example' });
 * ```
 */
class HTTPClient {
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;

  constructor() {
    this.defaultHeaders = { ...HTTP_CONFIG.headers };
    this.defaultTimeout = HTTP_CONFIG.timeout;
  }

  /**
   * Get the base URL (dynamically resolved based on execution context)
   * @private
   */
  private getBaseURL(): string {
    return getBaseURL();
  }

  /**
   * Get authentication token
   * @private
   */
  private async getAuthToken(): Promise<string | null> {
    try {
      return await authService.getUserToken();
    } catch {
      return null;
    }
  }

  /**
   * Build full URL from path
   * @private
   */
  private buildURL(path: string): string {
    // If path is already a full URL, return as-is
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }

    // Get base URL (dynamically resolved)
    const baseURL = this.getBaseURL();

    // Remove leading slash from path if present
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;

    // Ensure baseURL doesn't end with slash
    const cleanBaseURL = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;

    return `${cleanBaseURL}/${cleanPath}`;
  }

  /**
   * Build request headers with authentication
   * @private
   */
  private async buildHeaders(
    customHeaders?: Record<string, string>,
    requireAuth = true,
  ): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...customHeaders,
    };

    if (requireAuth) {
      const token = await this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Core fetch method with timeout and error handling
   * @private
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number,
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      return response;
    } catch (error) {
      // Handle timeout errors
      if (error instanceof Error && error.name === "AbortError") {
        throw new HTTPError(
          `Request timeout after ${timeout}ms`,
          408,
          "Request Timeout",
          url,
        );
      }

      // Handle network errors (DNS failures, connection refused, etc.)
      if (error instanceof TypeError) {
        // TypeError is thrown for network errors in fetch
        throw new HTTPError(
          `Network error: ${error.message}. Check if backend is running and URL is correct.`,
          0, // Network errors don't have HTTP status codes
          "Network Error",
          url,
        );
      }

      // Handle other errors with detailed context
      if (error instanceof Error) {
        throw new HTTPError(
          `Fetch failed: ${error.message}`,
          0,
          error.name,
          url,
        );
      }

      // Unknown error type
      throw new HTTPError(
        `Unknown error occurred during fetch`,
        0,
        "Unknown Error",
        url,
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Handle HTTP response and errors
   * @private
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = "Unknown error";

      try {
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorJson = await response.json();
          // Support common error response formats from Go backend
          errorMessage =
            errorJson.error ||
            errorJson.message ||
            errorJson.detail ||
            JSON.stringify(errorJson);
        } else {
          errorMessage = await response.text();
        }
      } catch {
        errorMessage = response.statusText || "Unknown error";
      }

      throw new HTTPError(
        errorMessage,
        response.status,
        response.statusText,
        response.url,
      );
    }

    // Check if response has content
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json();
    }

    // Return empty object for no-content responses
    if (response.status === 204) {
      return {} as T;
    }

    // For other content types, return text
    const text = await response.text();
    return text as unknown as T;
  }

  /**
   * Generic request method
   * @private
   */
  private async request<T>(
    path: string,
    options: HTTPClientOptions = {},
  ): Promise<T> {
    const {
      headers: customHeaders,
      requireAuth = true,
      timeout = this.defaultTimeout,
      ...fetchOptions
    } = options;

    const url = this.buildURL(path);
    const headers = await this.buildHeaders(customHeaders, requireAuth);

    // Log request details in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[HTTPClient] ${fetchOptions.method || "GET"} ${url}`, {
        requireAuth,
        hasAuthToken: !!headers.Authorization,
        timeout,
      });
    }

    try {
      const response = await this.fetchWithTimeout(
        url,
        {
          ...fetchOptions,
          headers,
        },
        timeout,
      );

      // Log successful response in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[HTTPClient] Response ${response.status} from ${url}`);
      }

      return this.handleResponse<T>(response);
    } catch (error) {
      // Log error details
      console.error(`[HTTPClient] Request failed for ${url}:`, {
        error:
          error instanceof Error
            ? { name: error.name, message: error.message }
            : error,
        method: fetchOptions.method || "GET",
        requireAuth,
      });
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(path: string, options?: HTTPClientOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: "GET",
    });
  }

  /**
   * POST request
   */
  async post<T>(
    path: string,
    body?: unknown,
    options?: HTTPClientOptions,
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(
    path: string,
    body?: unknown,
    options?: HTTPClientOptions,
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    path: string,
    body?: unknown,
    options?: HTTPClientOptions,
  ): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(path: string, options?: HTTPClientOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: "DELETE",
    });
  }
}

/**
 * Singleton instance of HTTP client
 * Use this for all authenticated API requests
 */
export const httpClient = new HTTPClient();

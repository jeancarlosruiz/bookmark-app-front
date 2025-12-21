import { authService } from "./auth";

/**
 * HTTP Client Configuration
 */
const HTTP_CONFIG = {
  baseURL: process.env.API_URL || "",
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
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;

  constructor() {
    this.baseURL = HTTP_CONFIG.baseURL;
    this.defaultHeaders = { ...HTTP_CONFIG.headers };
    this.defaultTimeout = HTTP_CONFIG.timeout;
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

    // Remove leading slash from path if present
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;

    // Ensure baseURL doesn't end with slash
    const cleanBaseURL = this.baseURL.endsWith("/")
      ? this.baseURL.slice(0, -1)
      : this.baseURL;

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
      if (error instanceof Error && error.name === "AbortError") {
        throw new HTTPError(
          `Request timeout after ${timeout}ms`,
          408,
          "Request Timeout",
          url,
        );
      }
      throw error;
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
      const errorText = await response.text().catch(() => "Unknown error");

      throw new HTTPError(
        `HTTP ${response.status}: ${errorText}`,
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

    const response = await this.fetchWithTimeout(
      url,
      {
        ...fetchOptions,
        headers,
      },
      timeout,
    );

    return this.handleResponse<T>(response);
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

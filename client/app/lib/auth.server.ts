/**
 * Server-side utilities for authentication using cookies.
 * These utilities are meant to be used in loaders and actions.
 */

/**
 * Parse the Cookie header and extract the access_token value.
 */
export function getAuthToken(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.split("=").map((s) => s.trim());
      if (key && value !== undefined) {
        acc[key] = decodeURIComponent(value);
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return cookies["access_token"] || null;
}

/**
 * Create a Set-Cookie header value for the access token.
 * Use this when setting the auth cookie after login.
 */
export function createAuthCookie(
  token: string,
  options: {
    maxAge?: number;
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
  } = {},
): string {
  const {
    maxAge = 60 * 60 * 24 * 7, // 7 days default
    path = "/",
    httpOnly = true,
    secure = process.env.NODE_ENV === "production",
    sameSite = "Lax",
  } = options;

  const parts = [
    `access_token=${encodeURIComponent(token)}`,
    `Max-Age=${maxAge}`,
    `Path=${path}`,
    `SameSite=${sameSite}`,
  ];

  if (httpOnly) parts.push("HttpOnly");
  if (secure) parts.push("Secure");

  return parts.join("; ");
}

/**
 * Create a Set-Cookie header that clears the auth cookie.
 * Use this when logging out.
 */
export function clearAuthCookie(): string {
  return "access_token=; Max-Age=0; Path=/";
}

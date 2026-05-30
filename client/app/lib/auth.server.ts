import * as api from "~/api";
/**
 * Server-side utilities for authentication using cookies.
 * These utilities are meant to be used in loaders and actions.
 */

import { redirect } from "react-router";
import { createApiClient } from "~/hey-api";

/**
 * Parse the Cookie header and extract the access_token value.
 */
export function getAuthToken(
  request: Request,
  cookieName: "access_token" | "refresh_token" = "access_token",
): string | null {
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

  return cookies[cookieName] || null;
}

/**
 * Create a Set-Cookie header value for the access token.
 * Use this when setting the auth cookie after login.
 */
export function createAuthCookie(
  token: string,
  cookieName: "access_token" | "refresh_token" = "access_token",
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
    `${cookieName}=${encodeURIComponent(token)}`,
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
export function clearAuthCookie(
  cookieName: "access_token" | "refresh_token" = "access_token",
): string {
  return `${cookieName}=; Max-Age=0; Path=/`;
}

export async function refreshAuthToken(request: Request) {
  const refreshToken = getAuthToken(request, "refresh_token");
  if (!refreshToken) {
    throw redirect("/auth/login");
  }
  console.log(refreshToken);
  const client = createApiClient(refreshToken);
  const res = await api.auth.authControllerGetNewAccessTokenV1({
    client,
    body: { refresh_token: refreshToken },
  });
  if (res.error) {
    throw redirect("/auth/login");
  }
  console.log(res.data);
  return redirect(request.url, {
    headers: {
      "Set-Cookie": createAuthCookie(res.data.access_token, "access_token"),
    },
  });
}

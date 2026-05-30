import type { Route } from "./+types/auth.login";
import { redirect } from "react-router";
import * as api from "~/api";
import { createAuthCookie, getAuthToken } from "~/lib/auth.server";
import { createApiClient } from "~/hey-api";

export async function loader({ request }: Route.LoaderArgs) {
  const authToken = getAuthToken(request);

  const client = createApiClient(authToken);

  // If we already have a token, try to fetch the user to verify it's valid
  const res = await api.user.userControllerFindMeV1({ client });

  if (!res.error) {
    // Token is valid, redirect to dashboard
    return redirect("/app");
  }

  // If the token is invalid, we'll just continue with the auth flow and get a new one
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const redirectUri = `${url.origin}/auth/login`;
  if (!code)
    throw redirect(
      `${process.env.VITE_API_URL}/api/v1/auth/hackclubauth?redirect_uri=${redirectUri}`,
    );

  const exchangeResult = await api.auth.authControllerHackClubAuthCallbackV1({
    query: { code, redirect_uri: redirectUri },
  });

  if (exchangeResult.error) {
    console.error("Error exchanging code for token:", exchangeResult.error);
    throw redirect("/");
  }

  const headers = new Headers();

  headers.append(
    "Set-Cookie",
    createAuthCookie(exchangeResult.data.access_token, "access_token"),
  );
  headers.append(
    "Set-Cookie",
    createAuthCookie(exchangeResult.data.refresh_token, "refresh_token"),
  );
  return redirect("/app", {
    headers,
  });
}

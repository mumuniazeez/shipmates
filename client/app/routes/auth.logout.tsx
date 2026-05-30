import type { Route } from "./+types/auth.logout";
import { redirect } from "react-router";
import { clearAuthCookie } from "~/lib/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const headers = new Headers();
  headers.append("Set-Cookie", clearAuthCookie("access_token"));
  headers.append("Set-Cookie", clearAuthCookie("refresh_token"));

  return redirect("/", {
    headers,
  });
}

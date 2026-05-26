import type { Route } from "./+types/auth.logout";
import { redirect } from "react-router";
import { clearAuthCookie } from "~/lib/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  return redirect("/", {
    headers: {
      "Set-Cookie": clearAuthCookie(),
    },
  });
}

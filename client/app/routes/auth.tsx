import type { Route } from "./+types/auth";
import React, { useEffect } from "react";
import { redirect } from "react-router";
import { Badge } from "~/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDataTransferHorizontalIcon,
  Spinner,
} from "@hugeicons/core-free-icons";
import { Button } from "~/components/ui/button";
import * as api from "~/api";
import { createAuthCookie } from "~/lib/auth.server";

export function meta({ location }: Route.MetaArgs): Route.MetaDescriptors {
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  return [
    { title: code ? "Signing in..." : "Redirecting to hack club auth" },
    {
      name: "description",
      content:
        "Sign in to Shipmates to find your next collaborator and work on your project together.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const redirectUri = `${url.origin}/auth`;
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

  return redirect("/app", {
    headers: {
      "Set-Cookie": createAuthCookie(exchangeResult.data.access_token),
    },
  });
}

// export default function Auth({ loaderData }: Route.ComponentProps) {
//   useEffect(() => {}, [loaderData]);
//   return (
//     <div className="flex h-screen w-screen items-center justify-center md:px-30 px-20">
//       <div className="flex flex-col items-center gap-y-5">
//         <HugeiconsIcon icon={Spinner} className="animate-spin" size={32} />

//         <h1 className="text-4xl font-bold">Signing you in...</h1>
//         <p className="text-muted-foreground max-w-2xl text-center">
//           Let's exhange some tokens with Hack Club's servers and get you signed
//           in. This should only take a few seconds.
//         </p>
//       </div>
//     </div>
//   );
// }

import { getCurrentUser } from "~/lib/user.server";
import Sidebar from "~/components/Sidebar";
import type { Route } from "./+types/app";
import { Outlet, redirect } from "react-router";
import type { UserResponseDto } from "~/api";

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: "Shipmates | Where hackers meet" },
    {
      name: "description",
      content: "Ctrl+Atl+Meet your next collaborator to work on your project",
    },
  ];
}

export type OutletContext = {
  user: UserResponseDto;
};

export async function loader({ request }: Route.LoaderArgs) {
  const userRes = await getCurrentUser(request);
  if (userRes.error) {
    console.log(userRes.error);
    throw redirect("/");
  }
  return { user: userRes.data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex">
      <Sidebar user={loaderData.user} />
      <div className="p-5">
        <Outlet context={{ user: loaderData.user } satisfies OutletContext} />
      </div>
    </div>
  );
}

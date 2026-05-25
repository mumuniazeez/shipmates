import { getCurrentUser } from "~/lib/user.server";
import type { Route } from "./+types/app._index";

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: "Shipmates | Where hackers meet" },
    {
      name: "description",
      content: "Ctrl+Atl+Meet your next collaborator to work on your project",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const userRes = await getCurrentUser(request);
  return {user: userRes.data};
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <h1 className="text-4xl">
      {!loaderData.user ? "Error occurred" : loaderData.user.firstName}
    </h1>
  );
}

// import { getCurrentUser } from "~/lib/user.server";
import Sidebar from "~/components/Sidebar";
import type { Route } from "./+types/app._index";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: "Shipmates | Where hackers meet" },
    {
      name: "description",
      content: "Ctrl+Atl+Meet your next collaborator to work on your project",
    },
  ];
}

// export async function loader({ request }: Route.LoaderArgs) {
//   const userRes = await getCurrentUser(request);
//   if (userRes.error) {
//     console.log(userRes.error);
//     throw redirect("/");
//   }
//   return { user: userRes.data };
// }

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <div className="flex items-center">
        <Sidebar />
      </div>
    </main>
  );
}

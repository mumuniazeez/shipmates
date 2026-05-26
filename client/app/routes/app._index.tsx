// import { getCurrentUser } from "~/lib/user.server";
import Sidebar from "~/components/Sidebar";
import type { Route } from "./+types/app._index";
import { redirect, useOutletContext } from "react-router";
import type { OutletContext } from "./app";

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
  const { user } = useOutletContext<OutletContext>();
  return (
    <main>
      <div>
        <div>
          <div>
            <h1>Explore Live Pitches</h1>
            <p>Pitch your skills or double tap to ship with active author</p>
          </div>
        </div>
      </div>
    </main>
  );
}

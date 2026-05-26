import type { Route } from "./+types/app.my-deck";
import { Link, useOutletContext } from "react-router";
import type { OutletContext } from "./app";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sad02Icon } from "@hugeicons/core-free-icons";
import { Button } from "~/components/ui/button";
import ProjectPitchCard from "~/components/ProjectPitchCard";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: "My Deck | Shipmates - Where hackers meet" },
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
    <div className="md:w-[75%] w-full overflow-auto">
      <header className="border-b p-5">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Your Authored Pitches</h1>
          <p className="text-muted-foreground">
            Edit and monitor the pitches you've authored displayed on the
            central feed.
          </p>
        </div>
      </header>
      <main className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <ProjectPitchCard />
          <ProjectPitchCard />
          <ProjectPitchCard />
          <ProjectPitchCard />
        </div>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <HugeiconsIcon icon={Sad02Icon} />
            </EmptyMedia>
            <EmptyTitle>No Pitches yet.</EmptyTitle>
            <EmptyDescription>
              You haven't authored any pitch yet, try create one.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Link to={"/app"}>
              <Button variant={"outline"}>Explore Pitches</Button>
            </Link>
            <Button variant={"default"}>Create Pitch</Button>
          </EmptyContent>
        </Empty>
      </main>
    </div>
  );
}

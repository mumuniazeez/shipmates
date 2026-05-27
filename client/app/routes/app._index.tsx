// import { getCurrentUser } from "~/lib/user.server";
import Sidebar from "~/components/Sidebar";
import type { Route } from "./+types/app._index";
import { Link, redirect, useOutletContext } from "react-router";
import type { OutletContext } from "./app";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sad02Icon, Search } from "@hugeicons/core-free-icons";
import { Button } from "~/components/ui/button";
import ProjectPitchCard from "~/components/ProjectPitchCard";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "~/components/ui/empty";

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: "Explore | Shipmates - Where hackers meet" },
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

export default function DashboardExplore({ loaderData }: Route.ComponentProps) {
  const { user } = useOutletContext<OutletContext>();
  return (
    <div className="md:w-[75%] w-full overflow-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b p-5 gap-y-5">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Explore Live Pitches</h1>
          <p className="text-muted-foreground">
            Pitch your skills or double tap to ship with active author.
          </p>
        </div>
        <div className="flex gap-x-2">
          <InputGroup className="md:w-md w-[80%]">
            <InputGroupAddon>
              <HugeiconsIcon icon={Search} />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              placeholder="Query title, stack, users"
            />
          </InputGroup>
          <Button variant={"default"} className="w-[20%] md:w-auto">
            <HugeiconsIcon icon={Search} />
            Search
          </Button>
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
              Be the first to pitch your project and find collaborators to work
              with.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button variant={"default"}>Create Pitch</Button>
          </EmptyContent>
        </Empty>
      </main>
    </div>
  );
}

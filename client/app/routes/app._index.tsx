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
import { getAllProjectPitch } from "~/lib/projectPitch.server";
import { useDialogControlContext } from "~/contexts/DialogControlProvider";

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: "Explore | Shipmates - Where hackers meet" },
    {
      name: "description",
      content: "Ctrl+Atl+Meet your next collaborator to work on your project",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const res = await getAllProjectPitch(request);
  return res;
}

export default function DashboardExplore({ loaderData }: Route.ComponentProps) {
  const { user } = useOutletContext<OutletContext>();
  const { setOpenCreateProjectDialog } = useDialogControlContext();

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
        {loaderData.data ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {loaderData.data.map((projectPitch) => (
              <ProjectPitchCard
                key={projectPitch.id}
                projectPitch={projectPitch}
              />
            ))}
          </div>
        ) : loaderData.error.statusCode === 404 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <HugeiconsIcon icon={Sad02Icon} />
              </EmptyMedia>
              <EmptyTitle>No Pitches yet.</EmptyTitle>
              <EmptyDescription>
                Be the first to pitch your project and find collaborators to
                work with.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button
                variant={"default"}
                onClick={() => setOpenCreateProjectDialog(true)}
              >
                Create Pitch
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <HugeiconsIcon icon={Sad02Icon} />
              </EmptyMedia>
              <EmptyTitle>Unable to load project pitches.</EmptyTitle>
              <EmptyDescription>
                Please refresh the page. If issue persist DM @AzCodes on slack
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button
                variant={"default"}
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </main>
    </div>
  );
}

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
import { getAllMyProjectPitch } from "~/lib/projectPitch.server";
import { useDialogControlContext } from "~/contexts/DialogControlProvider";

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: "My Deck | Shipmates - Where hackers meet" },
    {
      name: "description",
      content: "Ctrl+Atl+Meet your next collaborator to work on your project",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const res = await getAllMyProjectPitch(request);
  return res;
}

export default function DashboardMyDeck({ loaderData }: Route.ComponentProps) {
  const { user } = useOutletContext<OutletContext>();
  const { setOpenCreateProjectDialog } = useDialogControlContext();

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
                Reload Page
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </main>
    </div>
  );
}

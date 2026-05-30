import type { Route } from "./+types/app.project-pitch.$projectPitchId";
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
import { getProjectPitchById } from "~/lib/projectPitch.server";
import { useDialogControlContext } from "~/contexts/DialogControlProvider";

export function meta({ loaderData }: Route.MetaArgs): Route.MetaDescriptors {
  return [
    {
      title: loaderData.data
        ? `${loaderData.data.title} | Shipmates - Where hackers meet`
        : `Project Pitch | Shipmates - Where hackers meet`,
    },
    {
      name: "description",
      content:
        loaderData.data?.description ||
        "Ctrl+Atl+Meet your next collaborator to work on your project",
    },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const res = await getProjectPitchById(request, params.projectPitchId);
  return res;
}

export default function ProjectDetails({ loaderData }: Route.ComponentProps) {
  const { user } = useOutletContext<OutletContext>();
  const { setOpenCreateProjectDialog } = useDialogControlContext();

  return (
    <div className="md:w-[75%] w-full overflow-auto">
      <main className="p-5">
        {loaderData.data ? (
          <ProjectPitchCard projectPitch={loaderData.data} />
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

import type { Route } from "./+types/app._index";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sad02Icon } from "@hugeicons/core-free-icons";
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
import SearchInput from "~/components/SearchInput";
import { useState } from "react";

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  const title = "Explore Live Pitches | Shipmates";
  const description =
    "Explore active project pitches and find developers to collaborate with. Double-tap to match and start building together on Shipmates.";
  const keywords =
    "live pitches, project ideas, find developers, hack club project, code collaboration, developer matchmaker";
  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: "/Shipmates-Logo.png" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: "/Shipmates-Logo.png" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const res = await getAllProjectPitch(request);
  return res;
}

export default function DashboardExplore({ loaderData }: Route.ComponentProps) {
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
        <SearchInput />
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

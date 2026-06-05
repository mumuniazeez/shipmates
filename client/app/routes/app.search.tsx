import React from "react";
import type { Route } from "./+types/app.search";
import { useDialogControlContext } from "~/contexts/DialogControlProvider";
import { Button } from "~/components/ui/button";
import { Sad02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import ProjectPitchCard from "~/components/ProjectPitchCard";
import SearchInput from "~/components/SearchInput";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "~/components/ui/empty";
import {
  getAllProjectPitch,
  searchProjectPitch,
} from "~/lib/projectPitch.server";

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [];
}

export async function loader({ url, request }: Route.LoaderArgs) {
  const searchParam = new URLSearchParams(url.search);
  const query = searchParam.get("q");
  const skills = searchParam.get("skills");
  console.log(query, skills);

  if (!query && !skills) {
    const res = await getAllProjectPitch(request);
    return res;
  } else {
    const res = await searchProjectPitch(request, query || undefined, skills || undefined);
    return res;
  }
}

export async function action({ url, request }: Route.ActionArgs) {
  const searchParam = new URLSearchParams(url.search);
  const query = searchParam.get("q");
  const skills = searchParam.get("skills");

  console.log(query, skills);
  if (!query && !skills) {
    const res = await getAllProjectPitch(request);
    return res;
  } else {
    const res = await searchProjectPitch(request, query || undefined, skills || undefined);
    return res;
  }
}

export default function SearchPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { setOpenCreateProjectDialog } = useDialogControlContext();

  const responseData = actionData || loaderData;

  return (
    <div className="md:w-[75%] w-full overflow-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b p-5 gap-y-5">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Search Live Pitches</h1>
          <p className="text-muted-foreground">
            Search for project pitch or skills to find collaborators
          </p>
        </div>
        <SearchInput />
      </header>
      <main className="p-5">
        {responseData.data ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {responseData.data.map((projectPitch) => (
              <ProjectPitchCard
                key={projectPitch.id}
                projectPitch={projectPitch}
              />
            ))}
          </div>
        ) : responseData.error.statusCode === 404 ? (
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

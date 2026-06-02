import type { Route } from "./+types/app.my-matches";
import { Link, useNavigate, useOutletContext } from "react-router";
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
import { getAllMatches } from "~/lib/match.server";
import MatchCard from "~/components/MatchCard";

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: "Crew Matches | Shipmates - Where hackers meet" },
    {
      name: "description",
      content: "Ctrl+Atl+Meet your next collaborator to work on your project",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const res = await getAllMatches(request);

  return res;
}

export default function DashboardMyMatches({
  loaderData,
}: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <div className="md:w-[75%] w-full overflow-auto">
      <header className="border-b p-5">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Your Active Partnership</h1>
          <p className="text-muted-foreground">
            See the active partnership you have with other hackers.
          </p>
        </div>
      </header>
      <main className="p-5">
        {loaderData.data ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {loaderData.data.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : loaderData.error.statusCode === 404 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <HugeiconsIcon icon={Sad02Icon} />
              </EmptyMedia>
              <EmptyTitle>No Matches yet.</EmptyTitle>
              <EmptyDescription>
                Explore Project Pitches and find collaborators to work with.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button variant={"default"} onClick={() => navigate("/app")}>
                Explore Project Pitches
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <HugeiconsIcon icon={Sad02Icon} />
              </EmptyMedia>
              <EmptyTitle>Unable to load matches.</EmptyTitle>
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

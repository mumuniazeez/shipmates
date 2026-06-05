import type { Route } from "./+types/app.project-pitch.$projectPitchId";
import {
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "react-router";
import type { OutletContext } from "./app";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  EllipsisVertical,
  Loader,
  Sad02Icon,
  Trash,
} from "@hugeicons/core-free-icons";
import { Button } from "~/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
import { getProjectPitchById } from "~/lib/projectPitch.server";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useState } from "react";
import UpdateProjectPitchDialog from "~/components/dialogs/UpdateProjectPitchDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import MatchDialog from "~/components/dialogs/MatchDialog";

export function meta({ loaderData }: Route.MetaArgs): Route.MetaDescriptors {
  const pitch = loaderData?.data;
  const title = pitch
    ? `${pitch.title} | Shipmates`
    : "Project Pitch | Shipmates";
  const description = pitch
    ? `Check out "${pitch.title}" on Shipmates: ${pitch.description}`
    : "Explore this project pitch on Shipmates and collaborate with developers from the Hack Club community.";
  const skills = pitch?.skillsNeeded?.map((s) => s.name).join(", ") || "";
  const keywords = pitch
    ? `${pitch.title}, project pitch, collaboration, ${skills}, hack club`
    : "project pitch, collaboration, developers, shipmates, hack club";
  const image = pitch?.user?.profileImg || "/Shipmates-Logo.png";

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const res = await getProjectPitchById(request, params.projectPitchId);
  return res;
}

export default function ProjectDetails({ loaderData }: Route.ComponentProps) {
  const { user } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const submit = useSubmit();
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [matchModalOpen, setMatchModalOpen] = useState(false);

  const navigation = useNavigation();

  const match = loaderData.data?.matches.find(
    (m) => m.collaboratingUserId === user.id,
  );
  const hasMatch = match !== undefined;

  const handleDelete = async () => {
    submit(
      { requestType: "delete-project-pitch", id: loaderData.data!.id },
      { method: "post", action: "/app" },
    );
  };

  const hasMatched =
    loaderData.data?.matches.find((m) => m.collaboratingUserId === user.id) !==
    undefined;

  return (
    <div className="md:w-[75%] w-full overflow-auto">
      <main className="p-5">
        {loaderData.data ? (
          <>
            <div className="space-y-5">
              <div className="flex justify-between">
                <div className="space-y-5">
                  <div className="flex items-center gap-x-2">
                    <img
                      src={
                        loaderData.data.user.profileImg || "/Shipmates-Logo.png"
                      }
                      alt={loaderData.data.description}
                      className="rounded-full w-8 h-8 object-cover"
                    />
                    <h5 className="font-medium">
                      {loaderData.data.user.firstName}{" "}
                      {loaderData.data.user.lastName}
                    </h5>
                    <div className="w-1 h-1 bg-accent-foreground rounded-full"></div>
                    <p className="text-sm text-muted-foreground">
                      {loaderData.data.user.email}
                    </p>
                  </div>
                  <h2 className="text-4xl font-bold">
                    {loaderData.data.title}
                  </h2>
                </div>
                {user.id === loaderData.data.userId && (
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"} size={"icon"}>
                        <HugeiconsIcon icon={EllipsisVertical} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <>
                        <DropdownMenuItem
                          onClick={() => setEditModalOpen(true)}
                        >
                          Update Project Pitch
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => setDeleteAlertOpen(true)}
                        >
                          <HugeiconsIcon icon={Trash} />
                          Delete Project Pitch
                        </DropdownMenuItem>
                      </>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <div className="bg-primary/20 rounded-2xl p-5">
                <p className="text-xl">{loaderData.data.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {loaderData.data.yswsProgramName && (
                  <Badge
                    variant={"default"}
                    title="This is from the YSWS program"
                  >
                    YSWS: {loaderData.data.yswsProgramName}
                  </Badge>
                )}
                {loaderData.data.skillsNeeded.map((skill) => (
                  <Badge key={skill.id} variant={"outline"}>
                    #{skill.name}
                  </Badge>
                ))}
              </div>
              {user.id === loaderData.data.userId ? (
                <div className="bg-primary/50 border border-primary px-2 py-1 rounded-2xl w-fit">
                  <p className="text-sm">Live on Global Feed</p>
                </div>
              ) : (
                <div className="space-x-2">
                  <Button onClick={() => setMatchModalOpen(true)}>
                    {hasMatched ? "View Match Status" : "Request to ship"}
                  </Button>
                </div>
              )}
            </div>
            <UpdateProjectPitchDialog
              projectPitch={loaderData.data}
              openUpdateProjectDialog={editModalOpen}
              setOpenUpdateProjectDialog={setEditModalOpen}
            />
            <MatchDialog
              projectPitch={loaderData.data}
              openMatchDialog={matchModalOpen}
              setOpenMatchDialog={setMatchModalOpen}
            />
            <AlertDialog
              open={deleteAlertOpen}
              onOpenChange={
                navigation.state !== "submitting"
                  ? setDeleteAlertOpen
                  : () => {}
              }
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure about this action?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this item.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={navigation.state === "submitting"}
                  >
                    {navigation.state === "submitting" && (
                      <HugeiconsIcon icon={Loader} className="animate-spin" />
                    )}
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
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
                onClick={() => navigate("/app/project-pitches")}
              >
                Explore Others
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

import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChevronRight,
  EllipsisVertical,
  Loader,
  Trash,
  Trash2,
} from "@hugeicons/core-free-icons";
import type { ProjectPitchResponseDto } from "~/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useNavigation, useOutletContext, useSubmit } from "react-router";
import type { OutletContext } from "~/routes/app";
import UpdateProjectPitchDialog from "./dialogs/UpdateProjectPitchDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export default function ProjectPitchCard({
  projectPitch,
}: {
  projectPitch: ProjectPitchResponseDto;
}) {
  const { user } = useOutletContext<OutletContext>();
  const submit = useSubmit();
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const navigation = useNavigation();

  const handleDelete = () => {
    submit(
      { requestType: "delete-project-pitch", id: projectPitch.id },
      { method: "post", action: "/app" },
    );
  };
  return (
    <>
      <div className="group border rounded-4xl p-5 flex flex-col gap-y-5 justify-between hover:border-primary duration-200">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <img
                src={projectPitch.user.profileImg || "/Shipmates-Logo.png"}
                width={50}
                className="rounded-full border border-primary p-0.5"
              />
              <div>
                <h6 className="text-xl font-bold line-clamp-1">
                  {projectPitch.user.firstName} {projectPitch.user.lastName}
                </h6>
                <p className="text-sm text-muted-foreground">
                  {projectPitch.user.email}
                </p>
              </div>
            </div>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                  <HugeiconsIcon icon={EllipsisVertical} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Open Project Pitch</DropdownMenuItem>
                {user.id === projectPitch.userId && (
                  <>
                    <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
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
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link
            to={`/app/project-pitch/${projectPitch.id}`}
            className="space-y-5 h-[fill-available]"
          >
            <div>
              <h3 className="group-hover:text-primary duration-200 text-2xl font-bold">
                {projectPitch.title}
              </h3>
              <p className="line-clamp-4">{projectPitch.description}</p>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-2">
              {projectPitch.skillsNeeded.map((skill) => (
                <Badge key={skill.id} variant={"outline"}>
                  #{skill.name}
                </Badge>
              ))}
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-between gap-x-2 mt-auto">
          <div className="flex items-center gap-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <p className="text-muted-foreground text-sm">Seeking Partner</p>
          </div>
          <div className="space-x-2">
            <Button variant={"outline"}>Pass</Button>
            <Button>Request to ship</Button>
          </div>
        </div>
      </div>
      <UpdateProjectPitchDialog
        projectPitch={projectPitch}
        openUpdateProjectDialog={editModalOpen}
        setOpenUpdateProjectDialog={setEditModalOpen}
      />
      <AlertDialog
        open={deleteAlertOpen}
        onOpenChange={
          navigation.state !== "submitting" ? setDeleteAlertOpen : () => {}
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure about this action?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              item.
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
  );
}

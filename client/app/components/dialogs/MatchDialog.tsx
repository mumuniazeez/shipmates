import { useState } from "react";
import * as api from "~/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import {
  useLocation,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Handshake, Loader } from "@hugeicons/core-free-icons";
import type { OutletContext } from "~/routes/app";
import { Button } from "../ui/button";

export default function ConfirmMatchDialog({
  projectPitch,
  openMatchDialog,
  setOpenMatchDialog,
}: {
  projectPitch: api.ProjectPitchResponseDto;
  openMatchDialog: boolean;
  setOpenMatchDialog: (open: boolean) => void;
}) {
  const { user } = useOutletContext<OutletContext>();

  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMatch = async () => {
    // Submit the match, this will initiate a slack handshake between both users.
    setIsSubmitting(true);
    await submit(
      { projectPitchId: projectPitch.id, requestType: "create-match" },
      {
        method: "POST",
        action: "/app",
        navigate: false,
      },
    );
    setIsSubmitting(false);
    setOpenMatchDialog(false);
  };

  return (
    <Dialog
      open={openMatchDialog}
      onOpenChange={!isSubmitting ? setOpenMatchDialog : () => {}}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crew Assemble!</DialogTitle>
          <DialogDescription>
            Let's connect you to {projectPitch.user.firstName}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex justify-center items-center space-x-2">
            <div className="text-center space-y-2">
              <img
                src={user.profileImg || "/Shipmates-Logo.png"}
                alt={user.firstName || "user1"}
                className="rounded-full mx-auto"
                width={50}
                height={50}
              />
              <p className="text-xs">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <HugeiconsIcon icon={Handshake} />
            <div className="text-center space-y-2">
              <img
                src={projectPitch.user.profileImg || "/Shipmates-Logo.png"}
                alt={projectPitch.user.firstName || "user1"}
                className="rounded-full mx-auto"
                width={50}
                height={50}
              />
              <p className="text-xs">
                {projectPitch.user.firstName} {projectPitch.user.lastName}
              </p>
            </div>
          </div>
          <div className="bg-secondary/20 rounded-2xl p-5">
            <p className="text-xl">
              You and {projectPitch.user.firstName} wants to build <br />
              <span className="font-semibold underline decoration-primary">
                "{projectPitch.title}"
              </span>
            </p>
          </div>
          <p>
            A dedicated Slack channel will be created for your private
            conversation, where the "Shipmates" bot will notify{" "}
            {projectPitch.user.firstName} and remain present to support future
            project pitch management features.
          </p>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
          <Button onClick={handleMatch} disabled={isSubmitting}>
            {isSubmitting && (
              <HugeiconsIcon icon={Loader} className="animate-spin" />
            )}
            Connect on Slack
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

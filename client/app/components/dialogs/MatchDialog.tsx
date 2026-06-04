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
  Link,
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
import { Badge } from "../ui/badge";

export default function MatchDialog({
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

  const match = projectPitch.matches.find(
    (m) => m.collaboratingUserId === user.id,
  );
  const hasMatch = match !== undefined;

  const handleCreateMatch = async () => {
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

  const handleCancelMatch = async () => {
    if (!match) return;

    setIsSubmitting(true);
    await submit(
      { matchId: match.id, requestType: "cancel-match" },
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
          {match && (
            <div className="flex items-center justify-between">
              <Badge variant={"outline"}>
                <div className="flex items-center gap-x-2">
                  <div
                    className={`w-2 h-2 ${match.matchStatus === "accepted" ? "bg-green-500" : match.matchStatus === "pending" ? "bg-yellow-500" : "bg-red-500"} rounded-full`}
                  />
                  <p className="text-sm capitalize">{match.matchStatus}</p>
                </div>
              </Badge>

              {match.slackChannelName && (
                <Badge>#{match.slackChannelName}</Badge>
              )}
            </div>
          )}
          <div className="bg-secondary/20 rounded-2xl p-5">
            <p className="text-xl">
              You and {projectPitch.user.firstName} wants to build <br />
              <span className="font-semibold underline decoration-primary">
                "{projectPitch.title}"
              </span>
            </p>
          </div>
          {hasMatch ? (
            <div>
              {match.matchStatus === "pending" ? (
                <p>
                  Waiting for {projectPitch.user.firstName} to accept your
                  match, Once your match is approved, Shipmates will spawn up a
                  dedicated Slack channel for your private conversation.
                </p>
              ) : match.matchStatus === "matching" ? (
                <p>
                  {projectPitch.user.firstName} has approved your match, a slack
                  channel ({match.slackChannelName}) has been spawned for your
                  conversations.
                </p>
              ) : match.matchStatus === "accepted" ? (
                <p>
                  {projectPitch.user.firstName} has accepted your match, you can
                  continue your conversation on Slack.
                </p>
              ) : match.matchStatus === "cancelled" ? (
                <p>You cancelled this match request.</p>
              ) : (
                <p>{projectPitch.user.firstName} has rejected your match.</p>
              )}
            </div>
          ) : (
            <p>
              You can connect with {projectPitch.user.firstName} on Slack, once
              your match is approved by {projectPitch.user.firstName}, a
              dedicated Slack channel will be spawn up for your to privately
              chat on Slack
            </p>
          )}
          <p className="text-center text-xs text-gray-400">
            Shipmates will not be responsible for any conversation that happens
            on the spawned slack channel. Remember to be respectful and
            professional in your conversations.
          </p>
          <p className="text-center text-xs text-gray-400">
            Not on Hack Club slack workspace? check out{" "}
            <Link
              to={"https://slack.hackclub.com"}
              target="_blank"
              className="text-primary"
            >
              this (so cool btw)
            </Link>
          </p>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
          {!hasMatch ? (
            <Button onClick={handleCreateMatch} disabled={isSubmitting}>
              {isSubmitting && (
                <HugeiconsIcon icon={Loader} className="animate-spin" />
              )}
              Connect on Slack
            </Button>
          ) : match.matchStatus === "pending" ||
            match.matchStatus === "matching" ? (
            <Button onClick={handleCancelMatch} disabled={isSubmitting}>
              {isSubmitting && (
                <HugeiconsIcon icon={Loader} className="animate-spin" />
              )}
              Cancel request
            </Button>
          ) : match.matchStatus === "accepted" ? (
            <div className="bg-green-500/50 border border-green-500 px-2 py-1 rounded-2xl">
              <p className="text-sm">Matched, you're all set!</p>
            </div>
          ) : (
            <div className="bg-red-500/50 border border-red-500 px-2 py-1 rounded-2xl">
              <p className="text-sm">Declined or Cancelled</p>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

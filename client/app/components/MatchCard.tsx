import { Handshake, Loader } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";
import { Link, useOutletContext, useSubmit } from "react-router";
import type { MatchResponseDto } from "~/api";
import type { OutletContext } from "~/routes/app";
import { Button } from "./ui/button";
import MatchDialog from "./dialogs/MatchDialog";
import { Badge } from "./ui/badge";

export default function MatchCard({ match }: { match: MatchResponseDto }) {
  const { user } = useOutletContext<OutletContext>();

  const isCollaborator = match.collaboratingUserId === user.id;
  const [isCanceling, setIsCanceling] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const submit = useSubmit();

  const handleCancelMatch = async () => {
    if (!match) return;

    setIsCanceling(true);
    await submit(
      { matchId: match.id, requestType: "cancel-match" },
      {
        method: "POST",
        action: "/app",
        navigate: false,
      },
    );
    setIsCanceling(false);
  };

  const handleApproveMatch = async () => {
    if (!match) return;

    setIsApproving(true);
    await submit(
      { matchId: match.id, requestType: "approve-match" },
      {
        method: "POST",
        action: "/app",
        navigate: false,
      },
    );
    setIsApproving(false);
  };
  return (
    <>
      <div className="group border rounded-4xl p-5 flex flex-col gap-y-5 justify-between hover:border-primary duration-200">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <Badge variant={"outline"}>
              <div className="flex items-center gap-x-2">
                <div
                  className={`w-2 h-2 ${match.matchStatus === "accepted" ? "bg-green-500" : match.matchStatus === "pending" ? "bg-yellow-500" : "bg-red-500"} rounded-full`}
                />
                <p className="text-sm capitalize">{match.matchStatus}</p>
              </div>
            </Badge>

            {match.slackChannelName && <Badge>#{match.slackChannelName}</Badge>}
          </div>
          <div>
            <Link
              to={`/app/project-pitch/${match.projectPitch.id}`}
              className="space-y-5 h-full"
            >
              <div>
                <h3 className="group-hover:text-primary duration-200 text-2xl font-bold">
                  {match.projectPitch.title}
                </h3>
                <p className="line-clamp-4">{match.projectPitch.description}</p>
              </div>
            </Link>
          </div>
          <div className="bg-secondary/20 rounded-2xl p-5">
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
                  src={
                    (isCollaborator
                      ? match.projectOwner.profileImg
                      : match.collaboratingUser.profileImg) ||
                    "/Shipmates-Logo.png"
                  }
                  alt={
                    (isCollaborator
                      ? match.projectOwner.firstName
                      : match.collaboratingUser.firstName) || "User"
                  }
                  className="rounded-full mx-auto"
                  width={50}
                  height={50}
                />
                <p className="text-xs">
                  {(isCollaborator
                    ? match.projectOwner.firstName
                    : match.collaboratingUser.firstName) +
                    " " +
                    (isCollaborator
                      ? match.projectOwner.lastName
                      : match.collaboratingUser.lastName)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-2 mt-auto">
            {/* If the user is the collaborator, they can cancel a pending or matching request */}
            {isCollaborator &&
            (match.matchStatus === "pending" ||
              match.matchStatus === "matching") ? (
              <Button onClick={handleCancelMatch} disabled={isCanceling}>
                {isCanceling && (
                  <HugeiconsIcon icon={Loader} className="animate-spin" />
                )}
                Cancel Match Request
              </Button>
            ) : match.matchStatus === "pending" ? (
              // If the user is the project owner and the proposal is pending, they can approve/reject
              <>
                <Button
                  variant={"default"}
                  onClick={handleApproveMatch}
                  disabled={isApproving || isCanceling}
                >
                  {isApproving && (
                    <HugeiconsIcon icon={Loader} className="animate-spin" />
                  )}
                  Approve Match
                </Button>
                <Button
                  onClick={handleCancelMatch}
                  disabled={isApproving || isCanceling}
                >
                  {isCanceling && (
                    <HugeiconsIcon icon={Loader} className="animate-spin" />
                  )}
                  Reject
                </Button>
              </>
            ) : match.matchStatus === "matching" ? (
              // If the user is the project owner and they are in the matching state, they can finalize the match
              <>
                <Button variant={"default"}>Mark as Matched</Button>
                <Button
                  onClick={handleCancelMatch}
                  disabled={isApproving || isCanceling}
                >
                  {isCanceling && (
                    <HugeiconsIcon icon={Loader} className="animate-spin" />
                  )}
                  Cancel Match
                </Button>
              </>
            ) : match.matchStatus === "accepted" ? (
              <div className="bg-green-500/50 border border-green-500 px-2 py-1 rounded-2xl">
                <p className="text-sm">Matched, you're all set!</p>
              </div>
            ) : (
              <div className="bg-red-500/50 border border-red-500 px-2 py-1 rounded-2xl">
                <p className="text-sm">Declined or Cancelled</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

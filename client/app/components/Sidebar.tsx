import React from "react";
import { Button } from "./ui/button";
import { Kbd } from "./ui/kbd";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Plus,
  Navigation,
  Layer,
  Users,
  SignOut,
} from "@hugeicons/core-free-icons";
import type { UserResponseDto } from "~/api";
import LogoutDialog from "./dialogs/LogoutDialog";
import { Link, useLocation } from "react-router";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router";
import { useDialogControlContext } from "~/contexts/DialogControlProvider";

export default function Sidebar({ user }: { user: UserResponseDto }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setOpenCreateProjectDialog, setOpenLogoutDialog } =
    useDialogControlContext();

  return (
    <div className="w-[25%] hidden h-screen p-5 bg-accent md:flex flex-col justify-between border-r">
      <div className="space-y-5">
        <header className="flex items-center gap-x-2">
          <img src="/Shipmates-Logo.png" width={50} />
          <div>
            <h3 className="text-2xl font-bold">Shipmates</h3>
            <p className="font-light">Hack Club Matchmaker</p>
          </div>
        </header>
        <Button
          className="w-full"
          onClick={() => setOpenCreateProjectDialog(true)}
        >
          <HugeiconsIcon icon={Plus} /> Pitch Project
        </Button>
        <Separator />
        <Button
          className="w-full justify-start"
          variant={pathname === "/app" ? "default" : "outline"}
          onClick={() => navigate("/app")}
        >
          <HugeiconsIcon icon={Navigation} /> Explore
        </Button>
        <Button
          className="w-full justify-start"
          variant={pathname === "/app/my-deck" ? "default" : "outline"}
          onClick={() => navigate("/app/my-deck")}
        >
          <HugeiconsIcon icon={Layer} /> My Deck (Pitches)
        </Button>
        <Button
          className="w-full justify-start"
          variant={pathname === "/app/my-matches" ? "default" : "outline"}
          onClick={() => navigate("/app/my-matches")}
        >
          <HugeiconsIcon icon={Users} /> Crew Matches
        </Button>
      </div>
      <div>
        <div className="bg-background flex items-center justify-between p-3 rounded-4xl">
          <div className="flex items-center gap-x-2">
            <img
              src={user.profileImg || "/Shipmates-Logo.png"}
              width={50}
              className="rounded-full border border-primary p-0.5"
            />
            <div>
              <h4 className="text-xl font-medium">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Button
            variant={"destructive"}
            title="Sign out"
            onClick={() => setOpenLogoutDialog(true)}
          >
            <HugeiconsIcon icon={SignOut} />
          </Button>
        </div>
      </div>
    </div>
  );
}

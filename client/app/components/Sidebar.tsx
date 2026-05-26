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

export default function Sidebar({ user }: { user: UserResponseDto }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
        <Button className="w-full">
          <HugeiconsIcon icon={Plus} /> Pitch Project
        </Button>
        <Separator />
        <Button
          className="w-full justify-between"
          variant={pathname === "/app" ? "default" : "outline"}
          onClick={() => navigate("/app")}
        >
          <span className="flex items-center gap-x-2">
            <HugeiconsIcon icon={Navigation} /> Explore
          </span>
          <Kbd>3</Kbd>
        </Button>
        <Button
          className="w-full justify-between"
          variant={pathname === "/app/my-deck" ? "default" : "outline"}
          onClick={() => navigate("/app/my-deck")}
        >
          <span className="flex items-center gap-x-2">
            <HugeiconsIcon icon={Layer} /> My Deck (Pitches)
          </span>
          <Kbd>5</Kbd>
        </Button>
        <Button
          className="w-full justify-between"
          variant={pathname === "/app/my-matches" ? "default" : "outline"}
          onClick={() => navigate("/app/my-matches")}
        >
          <span className="flex items-center gap-x-2">
            <HugeiconsIcon icon={Users} /> Crew Matches
          </span>
          <Kbd>10</Kbd>
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
          <LogoutDialog>
            <Button variant={"destructive"} title="Sign out">
              <HugeiconsIcon icon={SignOut} />
            </Button>
          </LogoutDialog>
        </div>
      </div>
    </div>
  );
}

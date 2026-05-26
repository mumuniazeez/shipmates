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

export default function Sidebar() {
  return (
    <div className="w-[25%] h-screen p-5 bg-accent flex flex-col justify-between">
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
        <hr />
        <Button className="w-full justify-between" variant={"outline"}>
          <span className="flex items-center gap-x-2">
            <HugeiconsIcon icon={Navigation} /> Explore
          </span>
          <Kbd>3</Kbd>
        </Button>
        <Button className="w-full justify-between" variant={"outline"}>
          <span className="flex items-center gap-x-2">
            <HugeiconsIcon icon={Layer} /> My Desk (Pitches)
          </span>
          <Kbd>5</Kbd>
        </Button>
        <Button className="w-full justify-between" variant={"outline"}>
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
              src="/Shipmates-Logo.png"
              width={50}
              className="rounded-full border border-primary p-0.5"
            />
            <div>
              <h4 className="text-xl font-medium">Abdulazeez Adewale</h4>
              <p>mumuniazeez99@gmail.com</p>
            </div>
          </div>
          <Button variant={"destructive"} title="Sign out">
            <HugeiconsIcon icon={SignOut} />
          </Button>
        </div>
      </div>
    </div>
  );
}

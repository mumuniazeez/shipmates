import React from "react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronRight } from "@hugeicons/core-free-icons";

export default function ProjectPitchCard() {
  return (
    <div className="group border rounded-4xl p-5 space-y-5 hover:border-primary duration-200">
      <div className="flex items-center gap-x-2">
        <img
          src={"/Shipmates-Logo.png"}
          width={50}
          className="rounded-full border border-primary p-0.5"
        />
        <div>
          <h6 className="text-xl font-bold line-clamp-1">
            Mumuuni Abudulazeez
          </h6>
          <p className="text-sm text-muted-foreground">
            mumuniazeez99@gmail.com
          </p>
        </div>
      </div>
      <div>
        <h3 className="group-hover:text-primary duration-200 text-2xl font-bold">
          Custom PCB Handheld Retro Console
        </h3>
        <p className="line-clamp-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde esse
          fuga eaque commodi vel? Reprehenderit numquam, libero dolor, fuga
          facere quam animi dicta culpa vitae quidem laboriosam autem earum
          consectetur.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-2">
        <Badge variant={"outline"}>#Hardware</Badge>
        <Badge variant={"outline"}>#Arduino</Badge>
        <Badge variant={"outline"}>#PCB</Badge>
        <Badge variant={"outline"}>#3d-Printing</Badge>
      </div>

      <div className="flex items-center justify-between gap-x-2">
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
  );
}

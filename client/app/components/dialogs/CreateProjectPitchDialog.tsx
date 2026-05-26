import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { HugeiconsIcon } from "@hugeicons/react";
import { Close, Plus } from "@hugeicons/core-free-icons";
import { Badge } from "../ui/badge";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";

export default function CreateProjectPitchDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Project Pitch</DialogTitle>
          <DialogDescription>
            Let's get started on creating your project pitch!
          </DialogDescription>
        </DialogHeader>
        <form action="" className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="project-title-input"
                className="flex justify-between"
              >
                <span> Project Title</span>
                <span className="text-muted-foreground!">
                  Max 50 characters
                </span>
              </FieldLabel>
              <Input
                type="text"
                placeholder="My Awesome Project"
                name="title"
                id="project-title-input"
                required
                minLength={5}
                maxLength={50}
              />
            </Field>
            <Field>
              <FieldLabel
                htmlFor="pitch-description-input"
                className="flex justify-between"
              >
                <span> Pitch Description & Needed Skills</span>
                <span className="text-muted-foreground!">
                  Max 200 characters
                </span>
              </FieldLabel>
              <Textarea
                placeholder="Describe your project scope and explain exactly what kind of partner you are looking for (e.g., 'I have the firmware down, but I need someone with solid CAD skills...')."
                name="description"
                id="pitch-description-input"
                minLength={10}
                maxLength={200}
                required
              ></Textarea>
            </Field>
            <Field>
              <FieldLabel htmlFor="pitch-description-input">
                Development Stack and Key Dependency
              </FieldLabel>
              <div className="grid grid-cols-5 gap-2">
                <div className="relative w-fit group">
                  <Badge variant={"outline"}>Nestjs</Badge>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-xs"}
                    className="absolute -top-2 -right-2 me-auto size-4 [&_svg:not([class*='size-'])]:size-3 hidden group-hover:inline-flex"
                  >
                    <HugeiconsIcon icon={Close} />
                  </Button>
                </div>
                <div className="relative w-fit group">
                  <Badge variant={"outline"}>Nestjs</Badge>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-xs"}
                    className="absolute -top-2 -right-2 me-auto size-4 [&_svg:not([class*='size-'])]:size-3 hidden group-hover:inline-flex"
                  >
                    <HugeiconsIcon icon={Close} />
                  </Button>
                </div>
                <div className="relative w-fit group">
                  <Badge variant={"outline"}>Nestjs</Badge>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-xs"}
                    className="absolute -top-2 -right-2 me-auto size-4 [&_svg:not([class*='size-'])]:size-3 hidden group-hover:inline-flex"
                  >
                    <HugeiconsIcon icon={Close} />
                  </Button>
                </div>
                <div className="relative w-fit group">
                  <Badge variant={"outline"}>Nestjs</Badge>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-xs"}
                    className="absolute -top-2 -right-2 me-auto size-4 [&_svg:not([class*='size-'])]:size-3 hidden group-hover:inline-flex"
                  >
                    <HugeiconsIcon icon={Close} />
                  </Button>
                </div>
                <div className="relative w-fit group">
                  <Badge variant={"outline"}>Nestjs</Badge>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-xs"}
                    className="absolute -top-2 -right-2 me-auto size-4 [&_svg:not([class*='size-'])]:size-3 hidden group-hover:inline-flex"
                  >
                    <HugeiconsIcon icon={Close} />
                  </Button>
                </div>
                <div className="relative w-fit group">
                  <Badge variant={"outline"}>Nestjs</Badge>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-xs"}
                    className="absolute -top-2 -right-2 me-auto size-4 [&_svg:not([class*='size-'])]:size-3 hidden group-hover:inline-flex"
                  >
                    <HugeiconsIcon icon={Close} />
                  </Button>
                </div>
                <div className="relative w-fit group">
                  <Badge variant={"outline"}>Nestjs</Badge>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-xs"}
                    className="absolute -top-2 -right-2 me-auto size-4 [&_svg:not([class*='size-'])]:size-3 hidden group-hover:inline-flex"
                  >
                    <HugeiconsIcon icon={Close} />
                  </Button>
                </div>
                <div className="relative w-fit group">
                  <Badge variant={"outline"}>Nestjs</Badge>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-xs"}
                    className="absolute -top-2 -right-2 me-auto size-4 [&_svg:not([class*='size-'])]:size-3 hidden group-hover:inline-flex"
                  >
                    <HugeiconsIcon icon={Close} />
                  </Button>
                </div>
                <div className="relative w-fit group">
                  <Badge variant={"outline"}>Nestjs</Badge>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-xs"}
                    className="absolute -top-2 -right-2 me-auto size-4 [&_svg:not([class*='size-'])]:size-3 hidden group-hover:inline-flex"
                  >
                    <HugeiconsIcon icon={Close} />
                  </Button>
                </div>
                <div className="relative w-fit group">
                  <Badge variant={"outline"}>Nestjs</Badge>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-xs"}
                    className="absolute -top-2 -right-2 me-auto size-4 [&_svg:not([class*='size-'])]:size-3 hidden group-hover:inline-flex"
                  >
                    <HugeiconsIcon icon={Close} />
                  </Button>
                </div>
                <div className="relative w-fit group">
                  <Badge variant={"outline"}>Nestjs</Badge>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-xs"}
                    className="absolute -top-2 -right-2 me-auto size-4 [&_svg:not([class*='size-'])]:size-3 hidden group-hover:inline-flex"
                  >
                    <HugeiconsIcon icon={Close} />
                  </Button>
                </div>
                <div className="relative w-fit group">
                  <Badge variant={"outline"}>Nestjs</Badge>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-xs"}
                    className="absolute -top-2 -right-2 me-auto size-4 [&_svg:not([class*='size-'])]:size-3 hidden group-hover:inline-flex"
                  >
                    <HugeiconsIcon icon={Close} />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* <Input
                  placeholder="E.g., 'React Native, Firebase, and OpenAI API'"
                  name="techStack"
                  id="tech-stack-input"
                  minLength={5}
                  maxLength={100}
                  required
                /> */}
                <Combobox items={["Hey", "There", "Search"]}>
                  <ComboboxInput placeholder="E.g., 'React Native, Firebase, and OpenAI API'" />
                  <ComboboxContent>
                    <ComboboxEmpty className={"items-center gap-x-2"}>
                      <p className="text-base">Not found</p>
                      <Button size={"sm"}>Add</Button>
                    </ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                <Button type="button" variant="outline">
                  <HugeiconsIcon icon={Plus} /> Add
                </Button>
              </div>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                No, keep me logged in
              </Button>
            </DialogClose>
            <Button variant="default" type="submit">
              Yes, log me out
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from "react";
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
  // const [s, sS] = useState("1");
  const [formData, setFormData] = useState<{
    projectTitle: string;
    pitchDescription: string;
    skills: string[];
  }>({ pitchDescription: "", projectTitle: "", skills: [] });

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
                  {formData.projectTitle.length}/50 chars
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
                value={formData.projectTitle}
                onChange={(e) =>
                  setFormData({ ...formData, projectTitle: e.target.value })
                }
              />
            </Field>
            <Field>
              <FieldLabel
                htmlFor="pitch-description-input"
                className="flex justify-between"
              >
                <span> Pitch Description & Needed Skills</span>
                <span className="text-muted-foreground!">
                  {formData.pitchDescription.length}/200 chars
                </span>
              </FieldLabel>
              <Textarea
                placeholder="Describe your project scope and explain exactly what kind of partner you are looking for (e.g., 'I have the firmware down, but I need someone with solid CAD skills...')."
                name="description"
                id="pitch-description-input"
                minLength={10}
                maxLength={200}
                required
                value={formData.pitchDescription}
                onChange={(e) =>
                  setFormData({ ...formData, pitchDescription: e.target.value })
                }
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
                <Combobox items={["Hey", "There", "Search"]}>
                  <ComboboxInput
                    placeholder="E.g., 'React Native, Firebase, and OpenAI API'"
                    className={"w-full"}
                  />
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
                Cancel
              </Button>
            </DialogClose>
            <Button variant="default" type="submit">
              Create Pitch
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

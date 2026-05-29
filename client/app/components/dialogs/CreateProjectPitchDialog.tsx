import { useEffect, useState } from "react";
import * as api from "~/api";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "../ui/combobox";
import { useDialogControlContext } from "~/contexts/DialogControlProvider";
import type { SkillResponseDto, YsWsResponseDto } from "~/api";
import { useSubmit } from "react-router";

export default function CreateProjectPitchDialog() {
  const { openCreateProjectDialog, setOpenCreateProjectDialog } =
    useDialogControlContext();
  const submit = useSubmit();

  const [formData, setFormData] = useState<{
    projectTitle: string;
    pitchDescription: string;
    skills: string[];
  }>({ pitchDescription: "", projectTitle: "", skills: [] });

  const [yswsPrograms, setYswsProgram] = useState<YsWsResponseDto[]>([]);
  const [skills, setSkills] = useState<SkillResponseDto[]>([]);

  const [skillInputValue, setSkillInputValue] = useState<string>("");

  useEffect(() => {
    async function fetchYswsPrograms() {
      const res = await api.ysws.yswsControllerFindActiveV1();
      if (res.error) return console.log(res.error.message);
      setYswsProgram(res.data);
    }
    async function fetchSkills() {
      const res = await api.skill.skillControllerFindAllV1();
      if (res.error) return console.log(res.error.message);
      setSkills(res.data);
    }
    fetchSkills();
    fetchYswsPrograms();
  }, []);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(
      { ...formData, requestType: "create-project-pitch" },
      {
        method: "post",
      },
    );
  };

  return (
    <Dialog
      open={openCreateProjectDialog}
      onOpenChange={setOpenCreateProjectDialog}
      modal={false}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Project Pitch</DialogTitle>
          <DialogDescription>
            Let's get started on creating your project pitch!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                name="projectTitle"
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
                name="pitchDescription"
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

              <Combobox
                items={skills.map((skill) => skill.name)}
                multiple
                value={formData.skills}
                name="skills"
                inputValue={skillInputValue}
                onInputValueChange={(value) => setSkillInputValue(value)}
                onValueChange={(val) =>
                  setFormData({ ...formData, skills: val })
                }
              >
                <ComboboxChips>
                  <ComboboxValue>
                    {formData.skills.map((item) => (
                      <ComboboxChip key={item}>{item}</ComboboxChip>
                    ))}
                  </ComboboxValue>
                  <ComboboxChipsInput placeholder="E.g., 'React Native, Firebase, and OpenAI API'" />
                </ComboboxChips>

                <ComboboxContent>
                  <ComboboxList>
                    <ComboboxCollection>
                      {(item) => {
                        return (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        );
                      }}
                    </ComboboxCollection>
                    {!skills.find((s) =>
                      s.name
                        .toLowerCase()
                        .includes(skillInputValue.toLowerCase()),
                    ) && (
                      <ComboboxItem
                        key={skillInputValue}
                        value={skillInputValue}
                      >
                        Add "{skillInputValue}"
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
            <Field>
              <FieldLabel htmlFor="pitch-ysws-input">
                YSWS Program (Optional)
              </FieldLabel>

              <Combobox
                items={yswsPrograms.map((ysws) => ysws.name)}
                disabled={yswsPrograms.length === 0}
              >
                <ComboboxInput
                  placeholder="E.g., 'Horizon, Blueprint, Forge'"
                  className={"w-full"}
                  id="pitch-ysws-input"
                />
                <ComboboxContent>
                  <ComboboxEmpty>Not found</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
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

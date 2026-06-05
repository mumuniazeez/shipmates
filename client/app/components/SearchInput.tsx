import { Button } from "~/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";
import {
  Filter,
  Loader,
  Search,
  SearchingIcon,
} from "@hugeicons/core-free-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import type { SkillResponseDto } from "~/api";
import * as api from "~/api";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  useLocation,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router";

export default function SearchInput() {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  const [query, setQuery] = useState(searchParam.get("q") || "");
  const [skills, setSkills] = useState<string[]>(
    searchParam.get("skills")?.split(",") || [],
  );
  const [skillsData, setSkillsData] = useState<SkillResponseDto[]>([]);
  const navigate = useNavigate();

  const [isSearching, setIsSearching] = useState(false);

  const [skillInputValue, setSkillInputValue] = useState<string>("");
  const handleSearch = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    await navigate(`/app/search?q=${query}&skills=${skills.toString()}`);
    setIsSearching(false);
  };

  useEffect(() => {
    async function fetchSkills() {
      const res = await api.skill.skillControllerFindAllV1();
      if (res.error) return console.log(res.error.message);
      setSkillsData(res.data);
    }
    fetchSkills();
  }, []);

  return (
    <form className="flex gap-x-2" onSubmit={(e) => handleSearch(e)}>
      <InputGroup className="md:w-md w-[80%]">
        <InputGroupAddon>
          <HugeiconsIcon icon={Search} />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          placeholder="Query title, stack, users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>
      <Popover>
        <PopoverTrigger>
          <Button
            variant={skills.length > 0 ? "default" : "outline"}
            type="button"
          >
            <HugeiconsIcon icon={Filter} />
            {skills.length > 0 && <span>{skills.length}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-h-[340px] overflow-hidden">
          <Input
            value={skillInputValue}
            type="search"
            onChange={(e) => setSkillInputValue(e.target.value)}
            placeholder="Search for skills"
          />

          <div className="flex items-center flex-wrap gap-2 overflow-y-auto">
            {skillsData.length === 0 && <p>Loading skills..</p>}
            {skillsData
              .filter((s) => s.name.includes(skillInputValue))
              .map((skill) => (
                <Badge
                  key={skill.id}
                  variant={skills.includes(skill.name) ? "default" : "outline"}
                  className="cursor-pointer!"
                  onClick={() =>
                    skills.includes(skill.name)
                      ? setSkills((prev) =>
                          prev.filter((s) => s !== skill.name),
                        )
                      : setSkills((prev) => [...prev, skill.name])
                  }
                >
                  {skill.name}
                </Badge>
              ))}
          </div>

          <Button size={"sm"} onClick={() => setSkills([])}>
            Clear Filter
          </Button>
        </PopoverContent>
      </Popover>
      <Button
        variant={"default"}
        className="w-[20%] md:w-auto"
        type="submit"
        disabled={isSearching}
      >
        <HugeiconsIcon
          icon={isSearching ? Loader : Search}
          className={isSearching ? "animate-spin" : ""}
        />
        Search
      </Button>
    </form>
  );
}

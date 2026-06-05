import type { Route } from "./+types/project-pitch.$projectPitchId";
import { redirect } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  throw redirect(`/app/project-pitch/${params.projectPitchId}`);
}

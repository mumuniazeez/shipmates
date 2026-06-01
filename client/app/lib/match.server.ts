import * as api from "~/api";
import { getAuthToken } from "~/lib/auth.server";
import { createApiClient } from "~/hey-api";

export const matchUsersOnSlack = async (
  request: Request,
  projectPitchId: string,
) => {
  console.log(projectPitchId);
  const authToken = getAuthToken(request);
  const client = createApiClient(authToken);

  const res = await api.match.matchControllerCreateV1({
    body: { projectId: projectPitchId },
    client,
  });

  return res;
};

import * as api from "~/api";
import { getAuthToken } from "~/lib/auth.server";
import { createApiClient } from "~/hey-api";

export const getAllMatches = async (request: Request) => {
  const authToken = getAuthToken(request);
  const client = createApiClient(authToken);

  const res = await api.match.matchControllerFindAllRelatingToMeV1({ client });

  return res;
};

export const matchUsersOnSlack = async (
  request: Request,
  projectPitchId: string,
) => {
  const authToken = getAuthToken(request);
  const client = createApiClient(authToken);

  const res = await api.match.matchControllerCreateV1({
    body: { projectId: projectPitchId },
    client,
  });

  return res;
};

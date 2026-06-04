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

export const approveMatch = async (request: Request, matchId: string) => {
  const authToken = getAuthToken(request);
  const client = createApiClient(authToken);

  const res = await api.match.matchControllerConfirmMatchingV1({
    path: { id: matchId },
    client,
  });

  return res;
};

export const cancelOrRejectMatch = async (
  request: Request,
  matchId: string,
) => {
  const authToken = getAuthToken(request);
  const client = createApiClient(authToken);

  const res = await api.match.matchControllerCancelOrRejectV1({
    path: { id: matchId },
    client,
  });

  return res;
};

export const finalizeMatch = async (request: Request, matchId: string) => {
  const authToken = getAuthToken(request);
  const client = createApiClient(authToken);

  const res = await api.match.matchControllerFinalizeMatchingV1({
    path: { id: matchId },
    client,
  });

  return res;
};

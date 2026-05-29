import * as api from "~/api";
import { getAuthToken } from "~/lib/auth.server";
import { createApiClient } from "~/hey-api";

export const getAllProjectPitch = async (request: Request) => {
  const authToken = getAuthToken(request);
  const client = createApiClient(authToken);

  const res = await api.projectPitch.projectPitchControllerFindAllV1({
    client,
  });

  return res;
};

export const getAllMyProjectPitch = async (request: Request) => {
  const authToken = getAuthToken(request);
  const client = createApiClient(authToken);

  const res =
    await api.projectPitch.projectPitchControllerFindMyProjectPitchesV1({
      client,
    });

  return res;
};

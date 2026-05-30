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

export const createProjectPitch = async (
  request: Request,
  formData: FormData,
) => {
  const authToken = getAuthToken(request);
  const client = createApiClient(authToken);

  const res = await api.projectPitch.projectPitchControllerCreateV1({
    body: {
      projectTitle: formData.get("projectTitle") as string,
      pitchDescription: formData.get("pitchDescription") as string,
      skills: formData
        .get("skills")!
        .toString()
        .split(",")
        .map((s) => ({ name: s })),
    },
    client,
  });

  return res;
};

export const updateProjectPitch = async (
  request: Request,
  formData: FormData,
) => {
  const authToken = getAuthToken(request);
  const client = createApiClient(authToken);

  const res = await api.projectPitch.projectPitchControllerUpdateV1({
    path: { id: formData.get("id")!.toString() },
    body: {
      projectTitle: formData.get("projectTitle") as string,
      pitchDescription: formData.get("pitchDescription") as string,
      skills: formData
        .get("skills")!
        .toString()
        .split(",")
        .map((s) => ({ name: s })),
    },
    client,
  });

  return res;
};

export const deleteProjectPitch = async (
  request: Request,
  formData: FormData,
) => {
  const authToken = getAuthToken(request);
  const client = createApiClient(authToken);

  const res = await api.projectPitch.projectPitchControllerRemoveV1({
    path: { id: formData.get("id")!.toString() },
    client,
  });

  return res;
};

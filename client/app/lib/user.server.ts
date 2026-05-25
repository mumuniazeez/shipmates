import * as api from "~/api";
import { getAuthToken } from "~/lib/auth.server";
import { createApiClient } from "~/hey-api";
import { redirect } from "react-router";

export const getCurrentUser = async (request: Request) => {
  const authToken = getAuthToken(request);
  if (!authToken) throw redirect("/");
  const client = createApiClient(authToken);
  const res = await api.user.userControllerFindMeV1({ client });
  return res;
};

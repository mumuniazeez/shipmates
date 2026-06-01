import * as api from "~/api";
import { getAuthToken, refreshAuthToken } from "~/lib/auth.server";
import { createApiClient } from "~/hey-api";
import { redirect } from "react-router";

export const getCurrentUser = async (request: Request) => {
  const authToken = getAuthToken(request);
  const refreshToken = getAuthToken(request, "refresh_token");
  if (!authToken) throw redirect("/");
  const client = createApiClient(authToken);
  const res = await api.user.userControllerFindMeV1({ client });
  if (res.error && res.error.statusCode === 401) {
    if (!refreshToken) throw redirect("/");
    await refreshAuthToken(request);
  }
  return res;
};

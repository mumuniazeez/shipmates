import * as api from "~/api";
import { getCurrentUser } from "~/lib/user.server";
import Sidebar from "~/components/Sidebar";
import type { Route } from "./+types/app";
import { Outlet, redirect, useSubmit } from "react-router";
import type { UserResponseDto } from "~/api";
import DialogControlProvider, {
  useDialogControlContext,
} from "~/contexts/DialogControlProvider";
import CreateProjectPitchDialog from "~/components/dialogs/CreateProjectPitchDialog";
import {
  createProjectPitch,
  deleteProjectPitch,
  updateProjectPitch,
} from "~/lib/projectPitch.server";
import { useEffect } from "react";
import LogoutDialog from "~/components/dialogs/LogoutDialog";
import { refreshAuthToken } from "~/lib/auth.server";

export type OutletContext = {
  user: UserResponseDto;
};

export async function loader({ request }: Route.LoaderArgs) {
  const userRes = await getCurrentUser(request);
  if (userRes.error) {
    console.log(userRes.error);
    throw redirect("/");
  }
  return { user: userRes.data };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log(formData);
  const requestType = formData.get("requestType");
  if (requestType === "create-project-pitch") {
    const res = await createProjectPitch(request, formData);
    if (res.error) {
      return { requestType, error: res.error.message };
    }
    return { requestType, success: true };
  } else if (requestType === "update-project-pitch") {
    const res = await updateProjectPitch(request, formData);
    if (res.error) {
      return { requestType, error: res.error.message };
    }
    return { requestType, success: true };
  } else if (requestType === "delete-project-pitch") {
    const res = await deleteProjectPitch(request, formData);
    if (res.error) {
      return { requestType, error: res.error.message };
    }
    return { requestType, success: true };
  } else if (requestType === "refresh_token") {
    const res = await refreshAuthToken(request);

    return { requestType, success: true };
  }

  return { requestType, error: "Unknown request type" };
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const submit = useSubmit();
  useEffect(() => {
    const interval = setInterval(
      () => {
        submit({ requestType: "refresh_token" }, { method: "post" });
      },
      1000 * 28 * 60,
    );
    return () => clearInterval(interval);
  }, [submit]);

  return (
    <DialogControlProvider>
      <AppLayout loaderData={loaderData} actionData={actionData} />
    </DialogControlProvider>
  );
}

function AppLayout({
  loaderData,
  actionData,
}: {
  loaderData: Route.ComponentProps["loaderData"];
  actionData: Route.ComponentProps["actionData"];
}) {
  const { setOpenCreateProjectDialog } = useDialogControlContext();
  useEffect(() => {
    if (actionData?.requestType === "create-project-pitch") {
      if (actionData.success) {
        setOpenCreateProjectDialog(false);
      }
    }
  }, [actionData]);
  return (
    <>
      <div className="flex overflow-hidden h-screen">
        <Sidebar user={loaderData.user} />
        <Outlet context={{ user: loaderData.user } satisfies OutletContext} />
      </div>
      <CreateProjectPitchDialog />
      <LogoutDialog />
    </>
  );
}

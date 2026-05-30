import React from "react";

import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useDialogControlContext } from "~/contexts/DialogControlProvider";

export default function LogoutDialog() {
  const { openLogoutDialog, setOpenLogoutDialog } = useDialogControlContext();
  const navigate = useNavigate();
  return (
    <AlertDialog
      open={openLogoutDialog}
      onOpenChange={(open) => setOpenLogoutDialog(open)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Wait, hold on a sec!</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout of your account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, keep me logged in</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={() => navigate("/auth/logout")}
          >
            Yes, log me out
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

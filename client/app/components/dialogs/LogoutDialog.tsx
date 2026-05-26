import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

export default function LogoutDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wait, hold on a sec!</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout of your account?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">No, keep me logged in</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => navigate("/auth/logout")}
          >
            Yes, log me out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

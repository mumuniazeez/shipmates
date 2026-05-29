import React, { createContext, useContext, useState } from "react";

interface DialogControlContext {
  openCreateProjectDialog: boolean;
  setOpenCreateProjectDialog: (open: boolean) => void;
}

const DialogControlContext = createContext<DialogControlContext | null>(null);

export const useDialogControlContext = () => {
  const context = useContext(DialogControlContext);
  if (!context)
    throw new Error(
      "Please make sure to use DialogControlContext inside of a DialogControlProvider",
    );
  return context;
};

export default function DialogControlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openCreateProjectDialog, setOpenCreateProjectDialog] = useState(false);

  return (
    <DialogControlContext.Provider
      value={{ openCreateProjectDialog, setOpenCreateProjectDialog }}
    >
      {children}
    </DialogControlContext.Provider>
  );
}

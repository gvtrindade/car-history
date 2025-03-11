"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function Modal({
  title,
  content,
  footer,
  open,
  setOpen,
  includeCancel = false,
}: {
  title: string;
  content: string | ReactNode;
  footer: string | ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  includeCancel?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent aria-describedby={title}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div>{content}</div>

        <DialogFooter>
          {includeCancel && (
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          )}
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

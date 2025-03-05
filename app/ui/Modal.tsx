"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export default function Modal({
  triggerText,
  title,
  content,
  footer,
  includeCancel,
}: {
  triggerText: string;
  title: string;
  content: string | ReactNode;
  footer: string | ReactNode;
  includeCancel: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerText}</Button>
      </DialogTrigger>

      <DialogContent>
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

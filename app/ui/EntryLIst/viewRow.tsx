"use client";

import { deleteEntryById } from "@/app/lib/action/entry";
import { Entry } from "@/app/lib/definitions";
import { includeZero } from "@/app/lib/util";
import Modal from "@/app/ui/Modal";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  entry: Entry;
  hideDate: boolean;
  isEditing: boolean;
  setIsEditing: (state: boolean) => void;
};

export default function ViewRow({
  entry,
  hideDate = false,
  isEditing,
  setIsEditing,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function confirmDelete(entry: Entry) {
    try {
      await deleteEntryById(entry);
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
      // Show delete error toast
    }
  }

  return (
    <>
      <TableCell className="font-medium">
        {hideDate ? (
          ""
        ) : (
          <>
            {includeZero(entry.date.getUTCMonth())}/
            {includeZero(entry.date.getUTCDate())}/{entry.date.getUTCFullYear()}
          </>
        )}
      </TableCell>
      <TableCell>{entry.description}</TableCell>
      <TableCell>{entry.odometer}</TableCell>
      <TableCell>{entry.place}</TableCell>
      <TableCell>{entry.tags}</TableCell>
      <TableCell className="text-right">{entry.amount}</TableCell>
      <TableCell>
        {isEditing ? (
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        ) : (
          <div className="grid gap-2">
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button onClick={() => setOpen(true)}>Delete</Button>
            <Modal
              title="Delete Entry"
              content={
                <p>Are you sure you want to delete {entry.description}?</p>
              }
              footer={
                <Button onClick={() => confirmDelete(entry)}>Delete</Button>
              }
              open={open}
              setOpen={setOpen}
              includeCancel
            />
          </div>
        )}
      </TableCell>
    </>
  );
}

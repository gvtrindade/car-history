"use client";

import { deleteEntryById } from "@/app/lib/action/entry";
import { Entry } from "@/app/lib/definitions";
import { includeZero } from "@/app/lib/util";
import Modal from "@/app/ui/Modal";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();

  async function confirmDelete(entry: Entry) {
    try {
      if (session?.user && session?.user.id) {
        await deleteEntryById(session.user.id, entry);
        router.refresh();
        setOpen(false);
      } else {
        throw Error("Invalid user");
      }
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
            {includeZero(entry.date.getUTCMonth() + 1)}/
            {includeZero(entry.date.getUTCDate())}/{entry.date.getUTCFullYear()}
          </>
        )}
      </TableCell>
      <TableCell>{entry.description}</TableCell>
      <TableCell>{entry.odometer}</TableCell>
      <TableCell>{entry.place}</TableCell>
      <TableCell>{entry.tags}</TableCell>
      <TableCell className="text-right">
        ${Number(entry.amount).toFixed(2)}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        ) : (
          <div className="flex gap-2">
            <Button className="bg-blue-400" onClick={() => setIsEditing(true)}>
              <PencilIcon />
            </Button>
            <Button className="bg-red-400" onClick={() => setOpen(true)}>
              <TrashIcon />
            </Button>
          </div>
        )}
      </TableCell>
      <Modal
        title="Delete Entry"
        content={<p>Are you sure you want to delete {entry.description}?</p>}
        footer={<Button onClick={() => confirmDelete(entry)}>Delete</Button>}
        open={open}
        setOpen={setOpen}
        includeCancel
      />
    </>
  );
}

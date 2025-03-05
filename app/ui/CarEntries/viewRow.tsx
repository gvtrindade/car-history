"use client";

import { Entry } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import Modal from "@/app/ui/Modal";

function editEntry() {
  console.log("Editing");
}

function confirmDelete(entry: Entry) {
  console.log(entry);
}

export default function ViewRow({ entry }: { entry: Entry }) {
  return (
    <>
      <TableCell className="font-medium">
        {entry.date.getUTCMonth()}-{entry.date.getUTCDate()}-
        {entry.date.getUTCFullYear()}
      </TableCell>
      <TableCell>{entry.description}</TableCell>
      <TableCell>{entry.odometer}</TableCell>
      <TableCell>{entry.place}</TableCell>
      <TableCell>{entry.tags}</TableCell>
      <TableCell className="text-right">{entry.amount}</TableCell>
      <TableCell>
        <div className="grid gap-2">
          <Button onClick={() => editEntry()}>Edit</Button>
          <Modal
            triggerText="Del"
            title="Delete Entry"
            content={
              <p>Are you sure you want to delete ${entry.description}?</p>
            }
            footer={
              <Button onClick={() => confirmDelete(entry)}>Delete</Button>
            }
            includeCancel
          />
        </div>
      </TableCell>
    </>
  );
}

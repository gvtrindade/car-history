"use client";

import { Entry } from "@/app/lib/definitions";
import { TableCell, TableRow } from "@/components/ui/table";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import FormRow from "./formRow";
import ViewRow from "./viewRow";

type Props = {
  entry: Entry;
  key: number;
  hideDate: boolean;
};

export default function EntryRow({ entry, key, hideDate }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <TableRow key={key}>
        <ViewRow
          entry={entry}
          hideDate={hideDate}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </TableRow>
      {isEditing && (
        <TableRow>
          <TableCell colSpan={8}>
            <SessionProvider>
              <FormRow entry={entry} setIsEditing={setIsEditing} />
            </SessionProvider>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

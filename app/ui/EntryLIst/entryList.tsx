import { getEntriesByCarAndYear } from "@/app/lib/action/entry";
import { Car, Entry } from "@/app/lib/definitions";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EntryRow from "./entryRow";

let previousDate: Date | null = null;

function createRow(entry: Entry, key: number) {
  let hideDate = false;
  if (previousDate) {
    hideDate = previousDate.getDate() === entry.date.getDate();
  }
  previousDate = entry.date;

  return <EntryRow entry={entry} key={key} hideDate={hideDate} />;
}

export default async function EntryList({
  car,
  year,
}: {
  car: Car;
  year: number;
}) {
  const entries: Entry[] = await getEntriesByCarAndYear(car.id);

  return (
    <Table>
      <TableCaption>
        The list of expenses of the car {car.name} in the year {year}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Odometer</TableHead>
          <TableHead>Place</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry, key) => createRow(entry, key))}
      </TableBody>
    </Table>
  );
}

import { getEntriesByCarAndYear } from "@/app/lib/action/entry";
import { Car, Entry } from "@/app/lib/definitions";
import EntryRow from "@/app/ui/EntryLIst/entryRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  userId: string;
  car: Car;
  year: number;
  className?: string;
}

export default async function EntryList({
  userId,
  car,
  year,
  className = ""
}: Props) {
  const entries: Entry[] = await getEntriesByCarAndYear(userId, car.id);
  let previousDate: Date | null = null;

  function createRow(entry: Entry, key: number) {
    let hideDate = false;
    if (previousDate) {
      hideDate = previousDate.getDate() === entry.date.getDate();
    }
    previousDate = entry.date;

    return <EntryRow entry={entry} key={key} hideDate={hideDate} />;
  }

  return (
    <Table className={className}>
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

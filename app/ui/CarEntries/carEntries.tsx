import {
  deleteEntryById,
  getEntriesByCarAndYear,
} from "@/app/lib/action/entry";
import { Car, Entry } from "@/app/lib/definitions";
import ViewRow from "@/app/ui/CarEntries/viewRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

let isEditing = false;

const setIsEditing = (state: boolean) => {
  isEditing = state;
};

async function confirmDelete(entry: Entry) {
  try {
    await deleteEntryById(entry.id, entry.car.id);
  } catch (error) {
    console.log(error);
    // Show delete error toast
  }
}

export default async function CarEntries({
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
        {entries.map((entry, key) => (
          <TableRow key={key}>
            {isEditing ? <></> : <ViewRow entry={entry} />}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

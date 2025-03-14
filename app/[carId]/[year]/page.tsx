import { getCarById } from "@/app/lib/action/car";
import { Car } from "@/app/lib/definitions";
import EntryList from "@/app/ui/EntryLIst/entryList";
import EntryForm from "@/app/ui/entryForm";

export default async function YearEntries({
  params,
}: {
  params: { carId: string; year: number };
}) {
  const { carId: carId, year } = await params;
  const car: Car = await getCarById(carId);

  return (
    <>
      <h2>{car.name}</h2>

      <EntryForm carId={carId} />
      <EntryList car={car} year={year} />
    </>
  );
}

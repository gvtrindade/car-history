import { getCarById } from "@/app/lib/action/car";
import { getEntriesByCarAndYear } from "@/app/lib/action/entry";
import { Car, Entry } from "@/app/lib/definitions";
import CarEntries from "@/app/ui/CarEntries/carEntries";
import EntryForm from "@/app/ui/entryForm";

export default async function Page({
  params,
}: {
  params: { carId: string; year: number };
}) {
  const { carId: carId, year } = await params;
  const car: Car = await getCarById(carId);
  const entries: Entry[] = await getEntriesByCarAndYear(carId, year);

  return (
    <>
      <h2>{car.name}</h2>

      <EntryForm carId={carId} />
      <CarEntries car={car} year={year} />
    </>
  );
}

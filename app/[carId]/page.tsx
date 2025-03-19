import CarForm from "@/app/[carId]/CarForm";
import { getCarById } from "@/app/lib/action/car";
import { getEntryRecordYearByCarId } from "@/app/lib/action/entry";
import { Car } from "@/app/lib/definitions";
import { auth } from "@/auth";
import Link from "next/link";

export default async function CarPage({
  params,
}: {
  params: { carId: string };
}) {
  const session = await auth();
  if (!session?.user) return null;

  const { carId } = await params;
  const car: Car = await getCarById(carId);
  const entryRecordYears = await getEntryRecordYearByCarId(carId);

  return (
    <>
      <h2>{car.name}</h2>

      <CarForm car={car} />

      <div className="mt-6">
        <h3>Entries</h3>
        {entryRecordYears.map((year: number, key: number) => (
          <p className="mt-2 hover:text-undeline" key={key}>
            <Link href={`/${carId}/${year}`}>{year}</Link>
          </p>
        ))}
      </div>
    </>
  );
}

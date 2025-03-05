import { getCarById } from "@/app/lib/action/car";
import { getEntryRecordYearByCarId } from "@/app/lib/action/entry";
import { Car } from "@/app/lib/definitions";
import Link from "next/link";

export default async function Page({ params }: { params: { carId: string } }) {
  const { carId } = await params;
  const car: Car = await getCarById(carId);
  const entryRecordYears = await getEntryRecordYearByCarId(carId);

  return (
    <>
      <h2>{car.name}</h2>

      <div>
        <p>
          Name: <span>{car.name}</span>
        </p>
        <p>
          Model: <span>{car.model}</span>
        </p>
        <p>
          Year: <span>{car.year}</span>
        </p>
        <p>
          Brand: <span>{car.brand}</span>
        </p>
        <p>
          Color: <span>{car.color}</span>
        </p>
        <p>
          Plate: <span>{car.plate}</span>
        </p>
        <p>
          Renavam: <span>{car.renavam}</span>
        </p>
        <p>
          Aquired in year: <span>{car.aquired_year}</span>
        </p>
      </div>

      <div>
        {entryRecordYears.map((year: number, key: number) => (
          <p key={key}>
            <Link href={`/${carId}/${year}`}>
              {year}
            </Link>
          </p>
        ))}
      </div>
    </>
  );
}

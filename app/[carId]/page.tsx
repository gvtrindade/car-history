import CarForm from "@/app/[carId]/CarForm";
import { getCarById } from "@/app/lib/action/car";
import { getEntryRecordYearByCarId } from "@/app/lib/action/entry";
import { Car } from "@/app/lib/definitions";
import Title from "@/app/ui/title";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type Params = Promise<{ carId: string }>;

export default async function CarPage({ params }: { params: Params }) {
  const session = await auth();
  if (!session?.user) return null;

  const { carId } = await params;
  const car: Car = await getCarById(session.user.id!, carId);
  const entryRecordYears = await getEntryRecordYearByCarId(
    session.user.id!,
    carId
  );

  return (
    <div className="w-2/3 mx-auto">
      {car ? (
        <>
          <Title>{car.name}</Title>

          <CarForm userId={session.user.id!} car={car} className="my-6" />

          <Separator />

          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold">Entries</h3>
            {entryRecordYears.length > 0 ? (
              entryRecordYears.map((year: number, key: number) => (
                <p className="mt-2" key={key}>
                  <Link href={`/${carId}/${year}`} className="hover:underline">
                    {year}
                  </Link>
                </p>
              ))
            ) : (
              <p>No entries found</p>
            )}
          </div>
        </>
      ) : (
        <Title>Car not found</Title>
      )}
    </div>
  );
}

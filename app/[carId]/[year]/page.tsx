import { getCarById } from "@/app/lib/action/car";
import { Car } from "@/app/lib/definitions";
import EntryList from "@/app/ui/EntryLIst/entryList";
import EntryForm from "@/app/ui/entryForm";
import { auth } from "@/auth";

type Params = Promise<{ carId: string; year: number }>;

export default async function YearEntries({ params }: { params: Params }) {
  const session = await auth();
  if (!session?.user) return null;

  const { carId, year } = await params;
  const car: Car = await getCarById(session.user.id!, carId);

  return (
    <div className="flex flex-col gap-6 w-2/3 mx-auto">
      {car ? (
        <>
          <h2 className="text-3xl font-bold">{car.name}</h2>

          <EntryForm carId={carId} />
          <EntryList userId={session.user.id!} car={car} year={year} />
        </>
      ) : (
        <h3 className="font-bold text-4xl text-center">Car not found</h3>
      )}
    </div>
  );
}

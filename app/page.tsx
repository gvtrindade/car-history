import { getCarById, getCarsByUser } from "@/app/lib/action/car";
import { Car } from "@/app/lib/definitions";
import EntryList from "@/app/ui/EntryLIst/entryList";
import CarSelect from "@/app/ui/carSelect";
import EntryForm from "@/app/ui/entryForm";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Home({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user) return null;

  const cookieStore = await cookies();
  const savedUserId = cookieStore.has("userId")
    ? cookieStore.get("userId")?.value
    : null;
  let savedCarId = null;
  if (savedUserId === session.user.id!) {
    savedCarId = cookieStore.has("carId")
      ? cookieStore.get("carId")?.value
      : null;
  }

  const { carId = savedCarId } = await searchParams;

  const year = new Date().getFullYear();
  const car: Car = await getCarById(session.user.id!, carId);
  const userCars: Car[] = await getCarsByUser(session.user.id!);

  return (
    <div className="w-2/3 mx-auto">
      {car ? (
        <>
          <EntryForm carId={car.id} />

          <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:justify-center">
            <CarSelect defaultId={car.id} options={userCars} />
            <Button disabled>Export</Button>
          </div>

          <EntryList
            userId={session.user.id!}
            car={car}
            year={year}
            className="mt-6"
          />
        </>
      ) : (
        <h3 className="text-3xl font-bold"> Register a car to view entries </h3>
      )}
    </div>
  );
}

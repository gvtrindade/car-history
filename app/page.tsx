import { getCarById, getCarsByUser } from "@/app/lib/action/car";
import { getEntriesByCarAndYear } from "@/app/lib/action/entry";
import { Car, Entry } from "@/app/lib/definitions";
import EntryList from "@/app/ui/EntryLIst/entryList";
import CarSelect from "@/app/ui/carSelect";
import EntryForm from "@/app/ui/entryForm";
import ExportButton from "@/app/ui/exportButton";
import Title from "@/app/ui/title";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";

export const metadata: Metadata = {
  title: "Home - Car History",
};

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Home({ searchParams }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
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
  const entries: Entry[] = car
    ? await getEntriesByCarAndYear(session.user.id!, car.id, year)
    : [];

  return (
    <div className="w-2/3 mx-auto">
      {car ? (
        <>
          <Title>Car History</Title>
          <EntryForm carId={car.id} />

          <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:justify-center">
            <CarSelect defaultId={car.id} options={userCars} />
            <ExportButton entries={entries} carName={car.name} year={year} />
          </div>

          <EntryList
            userId={session.user.id!}
            car={car}
            year={year}
            className="mt-6"
          />
        </>
      ) : (
        <Title>Register a car to view entries </Title>
      )}
    </div>
  );
}

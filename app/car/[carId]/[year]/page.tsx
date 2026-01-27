import { getCarById } from "@/app/lib/action/car";
import { Car } from "@/app/lib/definitions";
import EntryList from "@/app/ui/EntryLIst/entryList";
import EntryForm from "@/app/ui/entryForm";
import Title from "@/app/ui/title";
import { auth } from "@/lib/auth";
import { Session } from "@/lib/auth-client";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Expenses",
};

type Params = Promise<{ carId: string; year: number }>;

export default async function YearEntries({ params }: { params: Params }) {
  const session: Session | null = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  const { carId, year } = await params;
  const car: Car = await getCarById(session.user.id!, carId);

  return (
    <div className="flex flex-col gap-6 w-2/3 mx-auto">
      {car ? (
        <>
          <Title>{car.name}</Title>

          <EntryForm carId={carId} />
          <EntryList userId={session.user.id!} car={car} year={year} />
        </>
      ) : (
        <Title>Car not found</Title>
      )}
    </div>
  );
}

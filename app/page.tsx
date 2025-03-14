import { getCarById, getCarsByUser } from "@/app/lib/action/car";
import { Car } from "@/app/lib/definitions";
import EntryList from "@/app/ui/EntryLIst/entryList";
import CarSelect from "@/app/ui/carSelect";
import EntryForm from "@/app/ui/entryForm";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Home({ searchParams }: Props) {
  const cookieStore = await cookies();
  const savedId = cookieStore.has("carId") ? cookieStore.get("carId")?.value : null;
  const { carId = savedId } = await searchParams;

  const year = new Date().getFullYear();
  const car: Car = await getCarById(carId);
  const userCars: Car[] = await getCarsByUser();

  return (
    <>
      {car ? (
        <>
          <EntryForm carId={car.id} />

          <div className="grid grid-cols-2 gap-4 m-4">
            <CarSelect defaultId={car.id} options={userCars} />
            <Button disabled>Export</Button>
          </div>

          <EntryList car={car} year={year} />
        </>
      ) : (
        <h3> Register a car to view entries </h3>
      )}
    </>
  );
}

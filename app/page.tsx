import { getCarById, getCarsByUser } from "@/app/lib/action/car";
import { Car } from "@/app/lib/definitions";
import CarEntries from "@/app/ui/CarEntries/carEntries";
import EntryForm from "@/app/ui/entryForm";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function Page() {
  // Get car from local storage
  // Add default for when no car is in localStorage

  const year = new Date().getFullYear();
  const car: Car = await getCarById();
  const userCars: Car[] = await getCarsByUser();

  return (
    <>
      {car ? (
        <>
          <EntryForm carId={car.id} />

          <div className="grid grid-cols-2 gap-4 m-4">
            <Select defaultValue={car.id}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Car" />
              </SelectTrigger>
              <SelectContent>
                {userCars.map((car, key) => (
                  <SelectItem value={car.id} key={key}>
                    {car.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button>Export</Button>
          </div>

          <CarEntries
            car={car}
            year={year}
          />
        </>
      ) : (
        <h3> Register a car to view entries </h3>
      )}
    </>
  );
}

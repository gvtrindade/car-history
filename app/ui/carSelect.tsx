"use client";

import { Car } from "@/app/lib/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setCookies } from "../lib/cookies";

type Props = {
  defaultId: string;
  options: Car[];
};

export default function CarSelect({ defaultId, options }: Props) {
  const router = useRouter();

  function changeCar(carId: string) {
    setCookies("carId", carId);
    const car = options.find((c) => c.id === carId);
    toast(car ? `Showing ${car.name}'s history` : "Changing car ");
    router.push(`?carId=${carId}`);
  }

  return (
    <Select defaultValue={defaultId} onValueChange={changeCar}>
      <SelectTrigger className="sm:w-1/3">
        <SelectValue placeholder="Car" />
      </SelectTrigger>
      <SelectContent>
        {options.map((car, key) => (
          <SelectItem value={car.id} key={key}>
            {car.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Car } from "../lib/definitions";
import { setCookies } from "../lib/cookies";

type Props = {
  defaultId: string;
  options: Car[];
};

export default function CarSelect({ defaultId, options }: Props) {
  const router = useRouter();
  
  function changeCar(carId: string) {
    setCookies("carId", carId);
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

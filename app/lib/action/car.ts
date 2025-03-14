import { deleteCar, fetchCarById, fetchCarsByUser, insertCar, updateCar } from "@/app/lib/data/car";
import { Car } from "@/app/lib/definitions";

const userId = "4f245a8f-07ec-4085-9870-7bbd8ee807ab";

export async function getCarsByUser() {
  return await fetchCarsByUser(userId);
}

export async function getCarById(carId: string | null = null) {
  return await fetchCarById(carId, userId);
}

export async function postCar(car: Car) {
  await insertCar(car, userId);
}

export async function putCar(car: Car) {
  await updateCar(car, userId);
}

export async function deleteCarById(carId: string) {
  await deleteCar(carId, userId);
}

import {
  deleteCar,
  fetchCarById,
  fetchCarsByUser,
  insertCar,
  updateCar,
} from "@/app/lib/data/car";
import { Car } from "@/app/lib/definitions";

export async function getCarsByUser(userId: string) {
  return await fetchCarsByUser(userId);
}

export async function getCarById(userId: string, carId: string | null = null) {
  return await fetchCarById(carId, userId);
}

export async function postCar(userId: string, car: Car) {
  await insertCar(car, userId);
}

export async function putCar(userId: string, car: Car) {
  await updateCar(car, userId);
}

export async function deleteCarById(userId: string, carId: string) {
  await deleteCar(carId, userId);
}

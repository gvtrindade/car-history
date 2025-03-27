import {
  deleteCar,
  fetchCarById,
  fetchCarsByUser,
  insertCar,
  updateCar,
} from "@/app/lib/data/car";
import { Car } from "@/app/lib/definitions";
import { fetchUsersByEmail } from "../data/user";
import { validateEmail } from "../util";

export async function getCarsByUser(userId: string) {
  return await fetchCarsByUser(userId);
}

export async function getCarById(userId: string, carId: string | null = null) {
  return await fetchCarById(carId, userId);
}

export async function postCar(userId: string, car: Car) {
  let linkedUsers: string[] = [];
  if (car.linked_emails) {
    const emails = new Set<string>();
    car.linked_emails.forEach((e) => {
      if (validateEmail(e)) emails.add(e);
    });
    linkedUsers = await fetchUsersByEmail(Array.from(emails));
  }
  await insertCar(car, userId, linkedUsers);
}

export async function putCar(userId: string, car: Car) {
  let linkedUsers: string[] = [];
  if (car.linked_emails) {
    const emails = new Set<string>();
    car.linked_emails.forEach((e) => {
      if (validateEmail(e)) emails.add(e);
    });
    linkedUsers = await fetchUsersByEmail(Array.from(emails));
  }
  await updateCar(car, userId, linkedUsers);
}

export async function deleteCarById(userId: string, carId: string) {
  await deleteCar(carId, userId);
}

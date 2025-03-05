"use server";

import sql from "@/app/lib/db";
import { Car } from "@/app/lib/definitions";

export async function fetchCarsByUser(userId: string) {
  const cars = await sql<Car[]>`
        SELECT * FROM cars WHERE user_id = ${userId}
    `;
  return cars;
}

export async function fetchCarById(
  carId: string | null,
  userId: string
): Promise<Car> {
  // TODO: create column is_default

  const data = await sql<Car[]>`SELECT * FROM cars WHERE ${
    carId
      ? sql`id = ${carId} AND user_id = ${userId}`
      : sql`user_id = ${userId} LIMIT 1`
  }`;
  return data[0];
}

export async function insertCar(car: Car, userId: string) {
  await sql`
    INSERT INTO cars(name, model, year, brand, color, plate, renavam, aquired_year, user_id)
    VALUES (${car.name}, ${car.model}, ${car.year}, ${car.brand}, ${car.color}, ${car.plate}, ${car.renavam}, ${car.aquired_year}, ${userId})`;
}

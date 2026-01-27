"use server";

import sql from "@/app/lib/db";
import { Car } from "@/app/lib/definitions";

export async function fetchCarsByUser(userId: string) {
  const cars = await sql<Car[]>`
      SELECT * 
      FROM cars 
      WHERE user_id = ${userId}
        OR ${userId} = ANY(linked_users)
    `;
  return cars;
}

export async function fetchCarById(
  carId: string | null,
  userId: string
): Promise<Car> {
  const data = await sql<Car[]>`
    SELECT *, (
      SELECT ARRAY_AGG(u.email) as linked_emails
      FROM "user" u
      WHERE u.id = ANY(c.linked_users)
    ) as linked_emails
    FROM cars c
    WHERE ${
      carId
        ? sql`id = ${carId} AND (user_id = ${userId} OR ${userId} = ANY(linked_users))`
        : sql`user_id = ${userId} OR ${userId} = ANY(linked_users) LIMIT 1`
    }
    `;
  return data[0];
}

export async function insertCar(
  car: Car,
  userId: string,
  linkedUsers: string[]
) {
  await sql`
    INSERT INTO cars(name, model, year, brand, color, plate, renavam, aquired_year, user_id, linked_users)
    VALUES (
      ${car.name}, ${car.model}, ${car.year}, ${car.brand},
      ${car.color}, ${car.plate}, ${car.renavam}, ${car.aquired_year},
      ${userId}, ${linkedUsers}
    )
  `;
}

export async function updateCar(
  car: Car,
  userId: string,
  linkedUsers: string[]
) {
  const row = await sql`
    UPDATE cars
    SET
      name = ${car.name}, 
      model = ${car.model},
      year = ${car.year},
      brand = ${car.brand},
      color = ${car.color},
      plate = ${car.plate}, 
      renavam = ${car.renavam}, 
      aquired_year = ${car.aquired_year},
      linked_users = ${linkedUsers}
    WHERE
      id = ${car.id}
    AND 
      user_id = ${userId}
      OR ${userId} = ANY(linked_users)
  `;
  if (!row) {
    throw new Error("Could not update entry");
  }
}

export async function deleteCar(carId: string, userId: string) {
  const row = await sql`
    DELETE FROM cars
    WHERE id = ${carId}
      AND (user_id = ${userId} OR ${userId} = ANY(linked_users))
  `;
  if (!row) {
    throw new Error("Could not update entry");
  }
}

export async function fetchLinkedCarEmails(carId: string, userId: string) {
  const row = await sql`
    SELECT ARRAY_AGG(u.email) as linked_emails
    FROM "user" u
    INNER JOIN cars c ON c.id = uc.car_id
    WHERE c.id = ${carId}
      AND c.user_id = ${userId}
  `;
  if (!row) {
    throw new Error("Could not update entry");
  }
  return row[0].linked_emails;
}

export async function fetchLinkedCarUsers(carId: string, linkedEmails: string[]) {
  const row = await sql`
    SELECT ARRAY_AGG(u.email) as linked_emails
    FROM "user" u
    INNER JOIN cars c ON c.id = uc.car_id
    WHERE c.id = ${carId}
      AND c.user_id = ${linkedEmails.join(",")}
  `;
  if (!row) {
    throw new Error("Could not update entry");
  }
  return row[0].linked_emails;
}

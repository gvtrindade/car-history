"use server";

import sql from "@/app/lib/db";
import { Entry } from "@/app/lib/definitions";

export async function fetchEntriesByCarAndUserByYear(
  carId: string,
  userId: string,
  year: number
) {
  const entries = await sql<Entry[]>`
    SELECT * 
    FROM entries 
    WHERE car_id IN (
      SELECT id
      FROM cars 
      WHERE id = ${carId} 
        AND (user_id = ${userId} OR ${userId} = ANY(linked_users))
    ) 
      AND date_part('year', date) = ${year}
    ORDER BY date desc
  `;
  return entries;
}

export async function fetchEntryRecordYearByCarId(
  carId: string,
  userId: string
) {
  let years = [];
  const row = await sql`
    SELECT ARRAY_AGG(DISTINCT EXTRACT(YEAR FROM date)) AS years 
    FROM entries 
    WHERE car_id IN (
      SELECT id 
      FROM cars 
      WHERE id = ${carId} 
        AND (user_id = ${userId} OR ${userId} = ANY(linked_users))
    )
  `;

  if (row.length > 0 && row[0].years !== null) {
    years = row[0].years;
  }
  return years;
}

export async function insertEntry(
  entry: { [key: string]: string | number },
  carId: string
) {
  const row = await sql`
    INSERT INTO entries(description, amount, odometer, date, place, tags, car_id)
    VALUES (${entry.description}, ${entry.amount}, ${entry.odometer}, ${entry.date}, ${entry.place}, ${entry.tags}, ${carId})
`;
  if (!row) {
    throw new Error("Could not insert new entry");
  }
}

export async function updateEntry(entry: Entry, userId: string) {
  const row = await sql`
    UPDATE entries
    SET description = ${entry.description},
      amount = ${entry.amount},
      odometer = ${entry.odometer},
      date = ${entry.date},
      place = ${entry.place},
      tags = ${entry.tags}
    WHERE id = ${entry.id} 
      AND car_id IN (
        SELECT id 
        FROM cars 
        WHERE id = ${entry.car_id} 
          AND (user_id = ${userId} OR ${userId} = ANY(linked_users))
      )
  `;
  if (!row) {
    throw new Error("Could not update entry");
  }
}

export async function deleteEntry(entry: Entry, userId: string) {
  const row = await sql`
    DELETE FROM entries 
    WHERE id = ${entry.id} 
      AND car_id IN (
        SELECT id 
        FROM cars 
        WHERE id = ${entry.car_id} 
          AND (user_id = ${userId} OR ${userId} = ANY(linked_users))
      )
  `;
  if (!row) {
    throw new Error("Could not delete entry");
  }
}

export async function fetchCarLastMileage(carId: string, userId: string) {
  const row = await sql`
    SELECT e.odometer
    FROM entries e
    INNER JOIN cars c ON c.id = e.car_id
    WHERE e.car_id = ${carId}
      AND (c.user_id = ${userId} OR ${userId} = ANY(c.linked_users))
    ORDER BY e.date desc
    LIMIT 1
  `;
  return row[0].odometer;
}

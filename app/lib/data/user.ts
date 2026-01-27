"use server";

import sql from "@/app/lib/db";
import { User } from "@/app/lib/definitions";

export async function fetchUserByEmail(
  email: string,
): Promise<User | undefined> {
  try {
    const rows = await sql<User[]>`
    SELECT * FROM "user"
    WHERE email = LOWER(${email})
    `;
    return rows[0];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch user.");
  }
}

export async function fetchUsersByEmail(emails: string[]): Promise<string[]> {
  try {
    const rows = await sql`
      SELECT ARRAY_AGG(id) as ids
      FROM "user" 
      WHERE email = ANY(${emails})
    `;
    return rows[0].ids;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch user.");
  }
}

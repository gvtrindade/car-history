"use server";

import { User } from "@/app/lib/definitions";
import sql from "../db";

type NewUser = {
  email: string;
  hash: string;
};

export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    const rows = await sql<User[]>`
      SELECT * FROM users 
      WHERE LOWER(email) = LOWER(${email})
    `;
    return rows[0];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch user.");
  }
}

export async function getUserByToken(token: string): Promise<User | undefined> {
  try {
    const rows = await sql<User[]>`
      SELECT u.* FROM users u
      JOIN user_tokens ut ON u.email = ut.email
      WHERE token = ${token}
      ORDER BY ut.created_at DESC
      LIMIT 1
    `;
    return rows[0];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch user.");
  }
}

export async function createUser(user: NewUser) {
  try {
    await sql`
      INSERT INTO users (email, hash) 
      VALUES (${user.email}, ${user.hash})
    `;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to create user.");
  }
}

export async function updateUser(user: User) {
  try {
    await sql`
      UPDATE users SET 
        hash = ${user.hash},
        is_deleted = ${user.is_deleted},
        is_validated = ${user.is_validated},
        is_admin = ${user.is_admin}
      WHERE id = ${user.id}
    `;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to reset password.");
  }
}

export async function createUserToken(email: string, token: string) {
  try {
    await sql`
      INSERT INTO user_tokens (email, token) 
      VALUES (${email}, ${token})
    `;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to save validation token.");
  }
}

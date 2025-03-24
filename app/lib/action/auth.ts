"use server";

import {
  createUser,
  createUserToken,
  getUserByEmail,
  getUserByToken,
  updateUser,
} from "@/app/lib/action/user";
import { signIn } from "@/auth";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { AuthError } from "next-auth";
import { z } from "zod";
import { EmailData, User } from "../definitions";
import { sendEmail } from "./email";

export async function authenticate(formData: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", formData);
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return "Invalid Credentials";
        default:
          return "Something went wrong";
      }
    }

    throw err;
  }
}

export async function signUp(formData: any) {
  const parsedCredentials = z
    .object({
      email: z.string(),
      password: z.string(),
    })
    .safeParse(formData);

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;
    let user = await getUserByEmail(email);

    if (user) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      hash: hashedPassword,
    };
    await createUser(newUser);

    const emailToken = randomUUID();
    await createUserToken(email, emailToken);

    const emailData: EmailData = {
      email: newUser.email,
      token: emailToken,
      subject: "Welcome to Car History",
      template: "signup",
    };
    await sendEmail(emailData);
  }
}

export async function validateUser(token: string) {
  const user = await getUserByToken(token);
  if (user) {
    await updateUser({ ...user, is_validated: true });
  }
}

export async function authenticateToken(token: string) {
  try {
    await getUserByToken(token);
    return true;
  } catch (err) {
    return false;
  }
}

export async function forgotPassword(formData: any) {
  const parsedCredentials = z
    .object({
      email: z.string(),
    })
    .safeParse(formData);

  if (parsedCredentials.success) {
    const { email } = parsedCredentials.data;
    const user = await getUserByEmail(email);

    if (!user) return null;

    const emailToken = randomUUID();
    await createUserToken(user.email, emailToken);

    const emailData: EmailData = {
      email: user.email,
      token: emailToken,
      subject: "Reset Password",
      template: "forgot-password",
    };
    await sendEmail(emailData);
  }
}

export async function resetPassword(formData: any, token: string) {
  const parsedCredentials = z
    .object({
      password: z.string(),
    })
    .safeParse(formData);

  if (parsedCredentials.success) {
    const { password } = parsedCredentials.data;
    const user = await getUserByToken(token);

    if (!user) return null;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = {
      ...user,
      password: hashedPassword,
    };

    await updateUser(updatedUser);
  }
}

"use server";

import { fetchUserByEmail } from "@/app/lib/data/user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

export async function signUp(formData: { [key: string]: string }) {
  const parsedCredentials = z
    .object({
      email: z.string(),
      password: z.string(),
    })
    .safeParse(formData);

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;
    const user = await fetchUserByEmail(email);

    if (user) throw new Error("User already exists");

    await auth.api.signUpEmail({
      body: {
        name: email.split("@")[0],
        email: email,
        password: password,
      },
    });
  }
}

export async function requestResetPassword(formData: {
  [key: string]: string;
}) {
  const parsedCredentials = z
    .object({
      email: z.email(),
    })
    .safeParse(formData);

  if (parsedCredentials.success) {
    const { email } = parsedCredentials.data;
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "/forgot-password/validate",
      },
    });
  }
}

export async function resetPassword(
  formData: { [key: string]: string },
  token: string,
) {
  const parsedCredentials = z
    .object({
      password: z.string(),
    })
    .safeParse(formData);

  if (parsedCredentials.success) {
    const { password } = parsedCredentials.data;
    await auth.api.resetPassword({
      body: {
        newPassword: password,
        token,
      },
    });
  }
}

export async function updatePassword(formData: { [key: string]: string }) {
  const parsedCredentials = z
    .object({
      oldPassword: z.string(),
      password: z.string(),
    })
    .safeParse(formData);

  if (parsedCredentials.success) {
    const { oldPassword, password } = parsedCredentials.data;
    await auth.api.changePassword({
      body: {
        newPassword: password,
        currentPassword: oldPassword,
        revokeOtherSessions: true,
      },
      headers: await headers(),
    });
  }
}

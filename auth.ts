import { getUserByEmail } from "@/app/lib/action/user";
import { authConfig } from "@/auth.config";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({
            email: z.string(),
            password: z.string(),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);

          if (!user || !user.is_validated) return null;

          const isPasswordCorrect = await bcrypt.compare(password, user.hash);

          if (isPasswordCorrect) {
            const cookieStore = await cookies();
            cookieStore.set("userId", user.id);
            return user;
          }
        }

        return null;
      },
    }),
  ],
});

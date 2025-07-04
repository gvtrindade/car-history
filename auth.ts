import { fetchUserByEmail } from "@/app/lib/data/user";
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
          const user = await fetchUserByEmail(email);

          if (!user || !user.is_validated) return null;

          const isPasswordCorrect = await bcrypt.compare(password, user.hash);

          if (isPasswordCorrect) {
            const cookieStore = await cookies();
            cookieStore.set("userId", user.id);

            if (cookieStore.has("carId")) {
              cookieStore.delete("carId");
            }

            return user;
          }
        }

        return null;
      },
    }),
  ],
});

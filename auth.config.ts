import { NextAuthConfig, Session } from "next-auth";

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: any }) {
      // FIX ME: there should be a way to use the correct type here
      session.user!.id = token.id;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnLogin = nextUrl.pathname.includes("/login");
      const isOnSignup = nextUrl.pathname.includes("/signup");
      const isOnPasswordReset = nextUrl.pathname.includes("/forgot-password");
      if (
        !isOnLogin &&
        !isOnSignup &&
        !isOnPasswordReset &&
        !isLoggedIn
      ) {
        return false;
      } else if ((isOnLogin || isOnSignup || isOnPasswordReset) && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

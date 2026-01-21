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

      const isOnLogin = nextUrl.pathname.endsWith("/login");
      const isOnSignup = nextUrl.pathname.endsWith("/signup");
      const isOnForgotPassword = nextUrl.pathname.endsWith("/forgot-password");

      const isOnUnprotectedPage = isOnLogin || isOnSignup || isOnForgotPassword;

      if (!isOnUnprotectedPage && !isLoggedIn) {
        // Redirect to login if page is not protected
        return false;
      } else if (isOnUnprotectedPage && isLoggedIn) {
        // Redirect to main page if logged user tries to access login, signup or forgot-password pages
        return Response.redirect(new URL("/", nextUrl));
      }

      // Let user access unprotected pages
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

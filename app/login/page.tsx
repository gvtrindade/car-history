"use client";

import Title from "@/app/ui/title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "./loginForm";
import GoogleButton from "./googleButton";

export default function Page() {
  return (
    <>
      <Title>Car History</Title>
      <div className="flex flex-col gap-8 px-10 md:flex-row md:justify-center md:pt-10 mt-6">
        <div>
          <LoginForm />
          <GoogleButton />
        </div>
        <div className="border"></div>

        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4 md:items-center">
            <h2 className="text-2xl">Forgot your password?</h2>
            <Link href="/forgot-password">
              <Button>Reset Password</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4 md:items-center">
            <h2 className="text-2xl">Don&apos;t have an account yet?</h2>
            <Link href="/signup">
              <Button>Sign up!</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

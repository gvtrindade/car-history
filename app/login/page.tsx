"use client";

import Link from "next/link";
import LoginForm from "./loginForm";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 px-10 md:flex-row md:justify-center md:pt-10">
      <LoginForm />

      <div className="border"></div>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4 md:items-center">
          <h2 className="text-2xl">Forgot your password?</h2>
          <Link href="/forgot-password">
            <Button>Reset Password</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-4 md:items-center">
          <h2 className="text-2xl">Don't have an account yet?</h2>
          <Link href="/signup">
            <Button>Sign up!</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

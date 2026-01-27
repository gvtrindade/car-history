import Title from "@/app/ui/title";
import ChangePasswordForm from "./changePasswordForm";
import { Session } from "@/lib/auth-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session: Session | null = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  return (
    <div className="flex flex-col gap-8">
      <Title>Reset Password</Title>
      <ChangePasswordForm />
    </div>
  );
}

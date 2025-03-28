import { createUserToken } from "@/app/lib/data/user";
import Title from "@/app/ui/title";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export default async function UserPage({}) {
  const session = await auth();
  if (!session || !session?.user) return null;

  async function resetPassword() {
    "use server";
    const emailToken = randomUUID();
    await createUserToken(session!.user!.email!, emailToken);
    redirect(`/forgot-password/${emailToken}?type=reset`);
  }

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <Title>User</Title>
      <div>
        <Label>Email</Label>
        <p>{session.user.email}</p>
      </div>
      <form action={resetPassword}>
        <Button type="submit">Reset Password</Button>
      </form>
    </div>
  );
}

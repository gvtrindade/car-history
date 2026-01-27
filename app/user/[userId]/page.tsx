import Title from "@/app/ui/title";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import { Session } from "@/lib/auth-client";
import { headers } from "next/headers";
import Link from "next/link";

export default async function UserPage({}) {
  const session: Session | null = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <Title>User</Title>
      <div>
        <Label>Email</Label>
        <p>{session.user.email}</p>
      </div>
      <Link href={`/user/${session.user.id}/change-password`}>Reset Password</Link>
    </div>
  );
}

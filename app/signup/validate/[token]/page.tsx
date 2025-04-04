import { validateUser } from "@/app/lib/action/auth";
import { createUserToken } from "@/app/lib/data/user";
import Title from "@/app/ui/title";
import { Button } from "@/components/ui/button";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { toast } from "sonner";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { token, email } = await searchParams;

  let isEmailValidated = false;

  try {
    if (token) {
      await validateUser(token);
      isEmailValidated = true;
    } else {
      throw Error("Token not found");
    }
  } catch {
    // Do nothing
  }

  async function resetToken() {
    "use server";
    if (email) {
      const newToken = randomUUID();
      await createUserToken(email, newToken);
      redirect(`/signup/validate/${newToken}`);
    } else {
      toast("Email not found, cannot generate new token");
    }
  }

  return (
    <div className="w-2/3 mx-auto">
      <Title>Car History</Title>

      <div className="mt-6 text-center">
        {isEmailValidated ? (
          <p>Thank you for validating your email!</p>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p>There was a problem validating your token</p>
            <form action={async () => resetToken()}>
              <Button type="submit">Resend token</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

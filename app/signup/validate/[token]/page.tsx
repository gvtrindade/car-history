import { validateUser } from "@/app/lib/action/auth";
import { getErrorMessage } from "@/app/lib/util";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Params = Promise<{ token: string }>;

export default async function Page({ params }: { params: Params }) {
  const { token } = await params;
  let isEmailValidated = false;

  try {
    await validateUser(token);
    isEmailValidated = true;
  } catch (e) {
    toast(getErrorMessage(e));
  }

  return (
    <>
      {isEmailValidated ? (
        <p>Thank you for validating your email!</p>
      ) : (
        <>
          <p>There was a problem validating your token</p>
          <Button>Resend token</Button>
        </>
      )}
    </>
  );
}

import { validateUser } from "@/app/lib/action/auth";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { token: string } }) {
  const { token } = params;
  let isEmailValidated = false;

  try {
    await validateUser(token);
    isEmailValidated = true;
  } catch (err) {
    // do nothing
  }

  return (
    <>
      {isEmailValidated ? (
        <p>Thank you for validating your email!</p>
      ) : (
        <>
          <p>
            There was a problem validating your token
          </p>
          <Button>Resend token</Button>
        </>
      )}
    </>
  );
}

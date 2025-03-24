import { authenticateToken } from "@/app/lib/action/auth";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import NewPasswordForm from "@/app/forgot-password/[token]/newPasswordForm";

type Params = Promise<{ token: string }>;

export default async function Page({ params }: { params: Params }) {
  const { token } = await params;
  const isEmailValidated = await authenticateToken(token);

  return (
    <div className="flex flex-col gap-8">
      <h2>Forgot Password</h2>

      <Suspense fallback={<p>Loading...</p>}>
        {isEmailValidated ? (
          <NewPasswordForm token={token} />
        ) : (
          <div className="flex flex-col gap-6 items-center">
            <p>There was a problem validating your token</p>
            <Button>Resend token</Button>
          </div>
        )}
      </Suspense>
    </div>
  );
}

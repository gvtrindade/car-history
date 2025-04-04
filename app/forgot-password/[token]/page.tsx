import NewPasswordForm from "@/app/forgot-password/[token]/newPasswordForm";
import { authenticateToken } from "@/app/lib/action/auth";
import Title from "@/app/ui/title";
import { Suspense } from "react";

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { token } = await params;
  const isEmailValidated = await authenticateToken(token);
  const { type } = await searchParams;

  return (
    <div className="flex flex-col gap-8">
      {type === "reset" ? (
        <Title>Reset Password</Title>
      ) : (
        <Title>Forgot Password</Title>
      )}

      <Suspense fallback={<p>Loading...</p>}>
        {isEmailValidated ? (
          <NewPasswordForm token={token} />
        ) : (
          <div className="flex flex-col gap-6 items-center">
            <p>There was a problem validating your token</p>
            <p>
              Please contact the admin at{" "}
              <a href="mailto:gabriel@trindade.dev">gabriel@trindade.dev</a>
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
}

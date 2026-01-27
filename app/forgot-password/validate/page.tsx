import NewPasswordForm from "@/app/forgot-password/validate/newPasswordForm";
import Title from "@/app/ui/title";

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { token } = await searchParams;

  return (
    <div className="flex flex-col gap-8">
      <Title>Reset Password</Title>
      <NewPasswordForm token={token} />
    </div>
  );
}

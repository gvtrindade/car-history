import AddForm from "@/app/add-car/addForm";
import Title from "@/app/ui/title";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <div className="w-2/3 mx-auto">
      <Title>Add car</Title>

      <AddForm userId={session.user.id!} className="mt-6" />
    </div>
  );
}

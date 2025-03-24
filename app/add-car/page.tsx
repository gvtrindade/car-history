import { auth } from "@/auth";
import AddForm from "./addForm";

export default async function Page() {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <div className="w-2/3 mx-auto">
      <h3 className="text-3xl font-bold">Add car</h3>

      <AddForm userId={session.user.id!} className="mt-6" />
    </div>
  );
}

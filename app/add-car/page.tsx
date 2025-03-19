import { auth } from "@/auth";
import AddForm from "./addForm";

export default async function Page() {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <>
      <h2>Add car</h2>

      <AddForm />
    </>
  );
}

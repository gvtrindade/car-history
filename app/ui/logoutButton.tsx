import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Logout</Button>
    </form>
  );
}

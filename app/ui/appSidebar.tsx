import { Car } from "@/app/lib/definitions";
import LogoutButton from "@/app/ui/logoutButton";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HomeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  isUserLogged: boolean;
  cars: Car[];
};

export default async function AppSidebar({ isUserLogged, cars }: Props) {
  return (
    <Sidebar>
      <SidebarHeader className="text-2xl font-bold hover:underline">
        <Link href="/">
          <h2>Car History</h2>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {isUserLogged ? (
          <SidebarMenu className="flex flex-col gap-2 mt-6">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <HomeIcon />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {cars.map((car) => (
              <SidebarMenuItem key={car.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/${car.id}`}>
                    <span>{car.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem className="flex justify-items-center">
              <SidebarMenuButton asChild>
                <Link href={"/add-car"}>
                  <PlusCircleIcon />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem className="absolute bottom-6 w-full">
              <div className="flex justify-center">
                <LogoutButton />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={"/login"}>
                  <span>Login</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

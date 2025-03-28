import { Car } from "@/app/lib/definitions";
import LogoutButton from "@/app/ui/logoutButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HomeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Session } from "next-auth";
import Link from "next/link";

type Props = {
  session: Session;
  cars: Car[];
};

export default async function AppSidebar({ session, cars }: Props) {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="hover:underline">
          <h2 className="text-2xl font-bold">Car History</h2>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {session?.user !== undefined ? (
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
                  <Link href={`/car/${car.id}`}>
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
              <div className="text-wrap w-2/3 mx-auto">
                <Link
                  href="https://www.flaticon.com/free-icons/travel"
                  title="travel icons"
                  className="text-xs text-gray-400 text-center"
                >
                  <p>Travel icons by juicy_fish</p>
                  <p>Flaticon</p>
                </Link>
              </div>
              <div className="flex justify-around mt-4">
                <Link href={`/user/${session.user.id}`}>
                  <Avatar>
                    <AvatarFallback>
                      {session.user.email![0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
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

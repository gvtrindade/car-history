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

type Props = {
  isUserLogged: boolean;
  cars: Car[];
};

export default async function AppSidebar({ isUserLogged, cars }: Props) {
  return (
    <Sidebar>
      <SidebarHeader className="text-2xl font-bold hover:underline">
        <a href="/">
          <h2>Car History</h2>
        </a>
      </SidebarHeader>

      <SidebarContent>
        {isUserLogged ? (
          <SidebarMenu className="flex flex-col gap-2 mt-6">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={"/"}>
                  <HomeIcon />
                  <span>Home</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {cars.map((car) => (
              <SidebarMenuItem key={car.id}>
                <SidebarMenuButton asChild>
                  <a href={`/${car.id}`}>
                    <span>{car.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem className="flex justify-items-center">
              <SidebarMenuButton asChild>
                <a href={"/add-car"}>
                  <PlusCircleIcon />
                </a>
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
                <a href={"/login"}>
                  <span>Login</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

import "@/app/globals.css";
import { getCarsByUser } from "@/app/lib/action/car";
import { Car } from "@/app/lib/definitions";
import AppSidebar from "@/app/ui/appSidebar";
import { auth } from "@/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Car History",
    default: "Car History",
  },
  description: "Manage your cars expenses",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  let cars: Car[] = [];
  if (session?.user?.id) {
    cars = await getCarsByUser(session.user.id);
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider defaultOpen={false}>
          <AppSidebar session={session!} cars={cars} />

          <main className="w-full pb-10">
            <SidebarTrigger />
            {children}
          </main>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}

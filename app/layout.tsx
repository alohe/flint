import "@/app/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/auth";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/theme-provider";
import SessionProvider from "@/components/session-provider";
import Logo from "@/components/logo";
import UserMenu from "@/components/user-menu";
import { AdminSidebar } from "@/components/admin-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FireStream - Open Source S3 Alternative",
  description: "A powerful file management system built with Next.js and Express, featuring secure file uploads, API key authentication, and user management.",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <SidebarProvider>
              {user && user.role === "ADMIN" && (
                <AdminSidebar />
              )}
              <div className="flex flex-col flex-1">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="flex h-14 items-center px-4">
                    <div className="flex flex-1 items-center justify-between">
                      <Logo />
                      <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <UserMenu />
                      </div>
                    </div>
                  </div>
                </header>
                <main className="flex-1 px-4">
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </SessionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

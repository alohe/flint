import "@/app/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/auth";
import { ThemeProvider } from "next-themes";
import SessionProvider from "@/components/session-provider";
import { AdminSidebar } from "@/components/admin-sidebar";
import Header from "@/components/header";
import { User } from "next-auth";

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
                <Header user={user as User} />
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

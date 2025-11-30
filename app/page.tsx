import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (user) {
    if (user.role === "ADMIN") {
      redirect("/admin");
    } else {
      redirect("/app");
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="flex flex-col items-center justify-center h-screen text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Welcome to Flint
          </h1>
          <p className="mt-8 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A modern, minimal Next.js boilerplate with authentication, user management, and a beautiful Vercel-inspired design system.
          </p>
          <div className="mt-12 flex items-center justify-center gap-6">
            <a
              href="/app"
              className="inline-flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-base font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Get started
            </a>
            <a 
              href="/auth/signin" 
              className="inline-flex items-center text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Sign in <span aria-hidden="true" className="ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Flint
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-prose">
          A simple and easy to use nextjs boilerplate for building a web app with a focus on authentication and user management.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/app"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            Get started
          </a>
          <a href="/auth/signin" className="text-sm font-semibold">
            Sign in <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

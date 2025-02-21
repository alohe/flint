import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function OverviewPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    return (
        <div className="container py-4 space-y-2">
            <h1 className="text-3xl font-bold">Welcome back, {session.user.name}</h1>
            <p className="text-muted-foreground">
                This is the app page.
            </p>
        </div>
    );
}

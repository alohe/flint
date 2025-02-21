import { Card } from "@/components/ui/card";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Users } from "lucide-react";
import { db } from "@/lib/db";

export default async function OverviewPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    if (session.user?.role !== "ADMIN") {
        redirect("/404");
    }

    const userCount = await db.user.count();

    return (
        <div className="container py-8 space-y-8">
            <h1 className="text-3xl font-bold">Overview</h1>
            <div className="grid gap-4 lg:grid-cols-3">
                <Link href="/users">
                    <Card className="p-6 hover:bg-muted/50 transition-colors relative">
                        <Users className="w-5 h-5 mb-4 absolute top-5 right-5" />
                        <h2 className="text-xl font-semibold">Users</h2>
                        <p className="text-3xl font-bold mt-2">
                            {userCount}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            Total registered users
                        </p>
                    </Card>
                </Link>
            </div>
        </div>
    );
}

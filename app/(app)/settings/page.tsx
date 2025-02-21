import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import Settings from "@/app/(app)/_components/settings";
import type { User } from "@prisma/client";

export default async function SettingsPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    return (
        <div className="container py-4 space-y-4">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            <Card>
                <Settings user={session.user as User} />
            </Card>
        </div>
    );
}

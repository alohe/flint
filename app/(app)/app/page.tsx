import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function OverviewPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Welcome back, {session.user.name}
                    </h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                        Here's what's happening with your account today.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="vercel-card p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Quick Actions
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Get started with your most common tasks.
                        </p>
                    </div>
                    
                    <div className="vercel-card p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Recent Activity
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            View your latest updates and changes.
                        </p>
                    </div>
                    
                    <div className="vercel-card p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Settings
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Manage your account preferences.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

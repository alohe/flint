import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "@/auth";

export default async function UserMenu() {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={session?.user?.image} alt={session?.user?.name || 'User avatar'} />
                    <AvatarFallback className="capitalize">{user.name?.[0] || user.email?.[0]}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Button variant="ghost" className="w-full justify-start" onClick={async () => {
                        'use server';
                        await signOut();
                    }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

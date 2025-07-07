"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Home, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
    const pathname = usePathname()

    const links = [
        {
            name: "Overview",
            href: "/admin",
            icon: <Home className="text-lg" />
        },
        {
            name: "Users", 
            href: "/admin/users",
            icon: <Users className="text-lg" />
        }
    ]

    return (
        <Sidebar className="border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarContent>
                <SidebarGroup className="space-y-3">
                    {links.map((link) => (
                        <SidebarGroupLabel key={link.name}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "flex w-full items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                                    pathname === link.href && "bg-gray-100 dark:bg-gray-800"
                                )}
                            >
                                {link.icon && (
                                    <span className="text-lg">{link.icon}</span>
                                )}
                                <span>{link.name}</span>
                            </Link>
                        </SidebarGroupLabel>
                    ))}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

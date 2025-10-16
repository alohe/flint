"use client";

import Logo from "./logo";
import { ThemeToggle } from "./theme-provider";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { User } from "next-auth";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
    menuPosition?: "left" | "center" | "right";
    user: User;
}

export default function Header({ menuPosition = "center", user }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navItems = [
        {
            label: "Dashboard",
            href: "/app"
        },
        {
            label: "Settings",
            href: "/settings"
        }
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getMenuPositionClasses = () => {
        switch (menuPosition) {
            case "center":
                return "justify-center";
            case "right":
                return "justify-end";
            case "left":
            default:
                return "justify-start";
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
            <div className="max-w-7xl mx-auto grid grid-cols-3 h-16 items-center px-6">
                {/* Left section */}
                <div className="flex items-center gap-6">
                    {menuPosition !== "center" && (
                        <>
                            <Logo />
                            {user && menuPosition === "left" && (
                                <nav className="hidden md:flex items-center gap-8">
                                    {navItems.map((item) => (
                                        <Link key={item.href} href={item.href} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            )}
                        </>
                    )}
                    {menuPosition === "center" && <Logo />}
                </div>

                {/* Center section */}
                <div className="flex justify-center">
                    {menuPosition === "center" && user && (
                        <nav className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    )}
                    {menuPosition === "right" && user && (
                        <nav className={cn("hidden md:flex items-center gap-8", getMenuPositionClasses())}>
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    )}
                </div>

                {/* Right section */}
                <div className="flex items-center gap-4 justify-end">
                    {user ? (
                        <>
                            <Link
                                href="/upgrade"
                                className="hidden sm:inline-flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                            >
                                Upgrade
                            </Link>
                            <div className="flex items-center gap-2 relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-full p-1"
                                >
                                    <Avatar className="cursor-pointer w-8 h-8">
                                        <AvatarImage src={user.image || ''} alt={user.name || 'User avatar'} />
                                        <AvatarFallback className="capitalize">{user.name?.[0] || user.email?.[0]}</AvatarFallback>
                                        <p className="">{user.name || user.email}</p>
                                    </Avatar>
                                    <ChevronDown
                                        className={twMerge(
                                            "transition-all duration-300 size-4",
                                            isOpen ? "rotate-180" : "",
                                        )}
                                        aria-hidden="true"
                                    />
                                </button>

                                <div
                                    className={twMerge(
                                        "absolute top-full right-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-xl rounded-xl p-1 min-w-48 border border-gray-200 dark:border-gray-800 transform transition-all duration-200 origin-top animate-in fade-in slide-in-from-top-2",
                                        isOpen ? "opacity-100 mt-2" : "opacity-0 invisible -mt-4",
                                    )}
                                >
                                    <div className="p-2">
                                        <div className="flex items-center gap-2 px-2 py-1.5 text-sm">
                                            <span className="font-medium">{user.name || user.email}</span>
                                        </div>
                                        <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                                        <div className="flex items-center justify-between px-2 py-1.5">
                                            <span className="text-sm">Theme</span>
                                            <ThemeToggle />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <ThemeToggle />
                            <Link
                                href="/auth/signin"
                                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/auth/signin"
                                className="inline-flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

import ApplicationLogo from "@/components/ApplicationLogo";
import NavLink from "@/components/NavLink";
import ResponsiveNavLink from "@/components/ResponsiveNavLink";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { User } from "@/types";
import { Link } from "@inertiajs/react";
import { CircleUser } from "lucide-react";
import { type PropsWithChildren, type ReactNode, useState } from "react";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen">
                <nav className="border-gray-100 border-b dark:border-neutral-900">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex shrink-0 items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current" />
                                    </Link>
                                </div>

                                <div className="sm:-my-px hidden space-x-8 sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("todos.index")}
                                        active={route().current("todos.index")}
                                    >
                                        Dashboard
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                <ThemeToggle />
                                <div className="relative ms-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost">
                                                {user.name}
                                                <CircleUser className="-me-0.5 ms-2 h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-56"
                                            align="end"
                                        >
                                            <DropdownMenuLabel>
                                                My Account
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <Link
                                                        className="w-full"
                                                        href={route(
                                                            "profile.edit",
                                                        )}
                                                    >
                                                        Profile
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link
                                                        className="w-full text-start"
                                                        href={route("logout")}
                                                        method="post"
                                                        as="button"
                                                    >
                                                        Log Out
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState,
                                        )
                                    }
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <title>Logo</title>
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={cn(
                            showingNavigationDropdown ? "block" : "hidden",
                            "sm:hidden",
                        )}
                    >
                        <div className="space-y-1 pt-2 pb-3">
                            <ResponsiveNavLink
                                href={route("todos.index")}
                                active={route().current("todos.index")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="border-t pt-4 pb-1">
                            <div className="px-4">
                                <div className="font-medium text-base">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 sm:px-6">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
                <Toaster />
            </div>
        </ThemeProvider>
    );
}

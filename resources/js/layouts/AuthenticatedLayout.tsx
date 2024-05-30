import ApplicationLogo from "@/components/ApplicationLogo";
import NavLink from "@/components/NavLink";
import ResponsiveNavLink from "@/components/ResponsiveNavLink";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/catalyst/button";
import {
    Dropdown,
    DropdownButton,
    DropdownHeading,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
} from "@/components/catalyst/dropdown";
import { Heading } from "@/components/catalyst/heading";
import { Link } from "@/components/catalyst/link";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { User } from "@/types";
import { ChevronDownIcon } from "lucide-react";
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
                                        <ApplicationLogo className="block h-9 w-auto fill-current dark:text-white" />
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
                                    <Dropdown>
                                        <DropdownButton outline>
                                            {user.name}
                                            <ChevronDownIcon className="size-4" />
                                        </DropdownButton>
                                        <DropdownMenu>
                                            <DropdownSection aria-label="My Account">
                                                <DropdownHeading>
                                                    My Account
                                                </DropdownHeading>
                                                <DropdownItem
                                                    className="w-full"
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </DropdownItem>
                                                <DropdownItem
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </DropdownItem>
                                            </DropdownSection>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <Button
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
                        <Heading
                            level={1}
                            className="mx-auto max-w-7xl px-4 py-6 lg:px-8 sm:px-6"
                        >
                            {header}
                        </Heading>
                    </header>
                )}

                <main>{children}</main>
                <Toaster />
            </div>
        </ThemeProvider>
    );
}

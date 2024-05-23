import { type InertiaLinkProps, Link } from "@inertiajs/react";
import { clsx } from "clsx";

export default function ResponsiveNavLink({
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={clsx(
                "flex w-full items-start border-l-4 py-2 ps-3 pe-4",
                active
                    ? "bg-accent focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800"
                    : "border-transparent text-gray-600 focus:border-gray-300 hover:border-gray-300 focus:bg-gray-50 hover:bg-gray-50 focus:text-gray-800 hover:text-gray-800",
                "font-medium text-base transition duration-150 ease-in-out focus:outline-none",
                className,
            )}
        >
            {children}
        </Link>
    );
}

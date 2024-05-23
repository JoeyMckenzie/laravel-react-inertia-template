import { type InertiaLinkProps, Link } from "@inertiajs/react";
import { clsx } from "clsx";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={clsx(
                "inline-flex items-center border-b-2 px-1 pt-1 font-medium text-sm leading-5 transition duration-150 ease-in-out focus:outline-none",
                active
                    ? "border-primary text-gray-900 focus:border-primary dark:text-neutral-200"
                    : "border-transparent text-gray-500 focus:border-gray-300 hover:border-gray-300 focus:text-gray-700 hover:text-gray-700",
                className,
            )}
        >
            {children}
        </Link>
    );
}

import { cn } from "@/lib/utils";
import { type InertiaLinkProps, Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={cn(
                "inline-flex items-center border-b-2 px-1 pt-1 font-medium text-sm leading-5 transition duration-150 ease-in-out focus:outline-none",
                active
                    ? "border-primary focus:border-primary"
                    : "border-transparent text-neutral-500 focus:border-gray-300 hover:border-gray-300 focus:text-gray-700 hover:text-gray-700",
                className,
            )}
        >
            {children}
        </Link>
    );
}

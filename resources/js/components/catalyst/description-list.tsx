import clsx from "clsx";

export function DescriptionList({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"dl">) {
    return (
        <dl
            {...props}
            className={clsx(
                className,
                "grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,theme(spacing.80))_auto] sm:text-sm/6",
            )}
        />
    );
}

export function DescriptionTerm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"dt">) {
    return (
        <dt
            {...props}
            className={clsx(
                className,
                "col-start-1 border-zinc-950/5 border-t pt-3 text-zinc-500 dark:border-white/5 sm:border-zinc-950/5 sm:dark:border-white/5 sm:border-t first:border-none sm:py-3 dark:text-zinc-400",
            )}
        />
    );
}

export function DescriptionDetails({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"dd">) {
    return (
        <dd
            {...props}
            className={clsx(
                className,
                "pt-1 pb-3 text-zinc-950 dark:sm:border-white/5 sm:border-zinc-950/5 sm:border-t sm:[&:nth-child(2)]:border-none sm:py-3 dark:text-white",
            )}
        />
    );
}

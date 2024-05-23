import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

export default function InputError({
    message,
    className = "",
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p {...props} className={clsx("text-red-600 text-sm", className)}>
            {message}
        </p>
    ) : null;
}

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export default function InputError({
    message,
    className = "",
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p {...props} className={cn("text-red-600 text-sm", className)}>
            {message}
        </p>
    ) : null;
}

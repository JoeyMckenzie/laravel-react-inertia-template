import { cn } from "@/lib/utils";

export function UpdateTodoForm({ className = "" }: { className?: string }) {
    return (
        <section className={cn("space-y-6", className)}>
            <h1>edit</h1>
        </section>
    );
}

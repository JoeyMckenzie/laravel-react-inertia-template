import { Heading } from "@/components/catalyst/heading";
import { Text } from "@/components/catalyst/text";
import type { TodoStatus } from "@/lib/models";

export function TodoStat({ stat, label }: { stat: number; label: TodoStatus }) {
    return (
        <div className="rounded-xl border shadow dark:border-neutral-900">
            <div className="flex flex-col space-y-1.5 p-6">
                <Text className="text-muted-foreground text-sm">{label}</Text>
                <Heading level={2}>{stat}</Heading>
            </div>
            <div className="p-6 pt-0">
                <Text className="text-muted-foreground text-xs">
                    Todos this week
                </Text>
            </div>
        </div>
    );
}

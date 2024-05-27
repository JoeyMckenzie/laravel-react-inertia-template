import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { TodoStatus } from "@/lib/models";

export function TodoStat({ stat, label }: { stat: number; label: TodoStatus }) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardDescription>{label}</CardDescription>
                <CardTitle className="text-4xl">{stat}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-muted-foreground text-xs">
                    Todos this week
                </div>
            </CardContent>
        </Card>
    );
}

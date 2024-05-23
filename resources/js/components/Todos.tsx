import { MoreHorizontal } from "lucide-react";
import { Badge, BadgeProps, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Todo } from "@/types/models";

type BadgeVariant =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;

export default function Todos({
    todos,
    total,
}: {
    todos: Todo[];
    total: number;
}) {
    const getStatusBadgeForStatus = (status: string): BadgeVariant => {
        switch (status) {
            case "Done":
                return "default";
            case "Cancelled":
                return "destructive";
            case "In Progress":
                return "outline";
            default:
                return "secondary";
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Todos</CardTitle>
                <CardDescription>
                    Manage your todos for the day, week, or whenever.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {todos.map(({ name, status, title }) => {
                            return (
                                <TableRow key={`${name}-${status}`}>
                                    <TableCell className="font-medium">
                                        {name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={getStatusBadgeForStatus(
                                                status,
                                            )}
                                        >
                                            {status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="truncate">
                                        {title}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Toggle menu
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>
                                                    Actions
                                                </DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-muted-foreground text-xs">
                    Showing <strong>1-10</strong> of <strong>{total}</strong>{" "}
                    products
                </div>
            </CardFooter>
        </Card>
    );
}

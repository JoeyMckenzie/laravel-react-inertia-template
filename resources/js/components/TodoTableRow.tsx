import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Todo } from "@/lib/models";
import { Link } from "@inertiajs/react";
import {
    BadgeCheck,
    Ban,
    CircleSlash,
    type LucideProps,
    MoreHorizontal,
    Sparkles,
} from "lucide-react";
import type React from "react";
import { useCallback } from "react";

type BadgeVariant =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;

export function TodoTableRow(todo: Todo) {
    const { name, status: currentStatus, title } = todo;

    const getStatusBadgeForStatus = useCallback((): {
        variant: BadgeVariant;
        icon: (props: LucideProps) => React.JSX.Element;
    } => {
        switch (currentStatus) {
            case "Done":
                return {
                    variant: "default",
                    icon: (props: LucideProps) => <BadgeCheck {...props} />,
                };
            case "Cancelled":
                return {
                    variant: "destructive",
                    icon: (props: LucideProps) => <Ban {...props} />,
                };
            case "In Progress":
                return {
                    variant: "outline",
                    icon: (props: LucideProps) => <Sparkles {...props} />,
                };
            default:
                return {
                    variant: "secondary",
                    icon: (props: LucideProps) => <CircleSlash {...props} />,
                };
        }
    }, [currentStatus]);

    const statusBadge = getStatusBadgeForStatus();

    return (
        <TableRow>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>
                <Badge variant={statusBadge.variant}>
                    <statusBadge.icon className="mr-2 h-4 w-4" />
                    {currentStatus}
                </Badge>
            </TableCell>
            <TableCell className="truncate">{title}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link
                            href={route("todos.show", todo.id)}
                            as="button"
                            className="w-full"
                        >
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                        <Link
                            preserveScroll
                            href={route("todos.destroy", todo.id)}
                            method="delete"
                            as="button"
                            className="w-full text-destructive"
                        >
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}

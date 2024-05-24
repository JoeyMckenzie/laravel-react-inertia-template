import { Badge } from "@/components/ui/badge";
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
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { PaginatedModel, Todo, TodoStatus } from "@/lib/models";
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
import { useState } from "react";

type BadgeVariant =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;

const statuses: TodoStatus[] = [
    "Not Started",
    "In Progress",
    "Done",
    "Cancelled",
];

function getStatusBadgeForStatus(status: TodoStatus): {
    variant: BadgeVariant;
    icon: (props: LucideProps) => React.JSX.Element;
} {
    switch (status) {
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
}

function TodoTableRow(todo: Todo) {
    const { name, status, title } = todo;
    const [currentStatus, setCurrentStatus] = useState(status);
    const statusBadge = getStatusBadgeForStatus(currentStatus);

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
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                Set status
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {statuses.map((status) => (
                                        <DropdownMenuItem
                                            key={`${status}-${todo.name}`}
                                            onClick={() =>
                                                setCurrentStatus(status)
                                            }
                                            disabled={currentStatus === status}
                                        >
                                            {status}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <Link
                            preserveScroll
                            href={route("todos.destroy", todo.id)}
                            method="delete"
                            as="button"
                            className="w-full dark:text-red-500"
                        >
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}

function TodoPagination(todos: PaginatedModel<Todo>) {
    const previousPage = todos.current_page === 1 ? 1 : todos.current_page - 1;
    const nextPage =
        todos.current_page === todos.last_page
            ? todos.last_page
            : todos.current_page + 1;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        preserveScroll
                        href={route("todos.index", {
                            page: previousPage,
                        })}
                    />
                </PaginationItem>
                {todos.current_page - 2 > 0 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {todos.current_page - 1 > 0 && (
                    <PaginationItem>
                        <PaginationLink
                            preserveScroll
                            href={route("todos.index", {
                                page: previousPage,
                            })}
                        >
                            {previousPage}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationLink
                        isActive
                        preserveScroll
                        href={route("todos.index", {
                            page: todos.current_page,
                        })}
                    >
                        {todos.current_page}
                    </PaginationLink>
                </PaginationItem>
                {nextPage < todos.last_page && (
                    <PaginationItem>
                        <PaginationLink
                            preserveScroll
                            href={route("todos.index", {
                                page: nextPage,
                            })}
                        >
                            {nextPage}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {todos.current_page + 1 <= todos.last_page && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationNext
                        preserveScroll
                        href={route("todos.index", { page: nextPage })}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default function Todos({
    todos,
}: {
    todos: PaginatedModel<Todo>;
}) {
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
                        {todos.data.map((todo) => (
                            <TodoTableRow key={todo.name} {...todo} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex flex-col gap-y-4">
                <TodoPagination {...todos} />
                <div className="text-muted-foreground text-xs">
                    Showing{" "}
                    <strong>
                        {todos.from}-{todos.to}
                    </strong>{" "}
                    of <strong>{todos.total}</strong> todos
                </div>
            </CardFooter>
        </Card>
    );
}

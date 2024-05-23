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
import { MoreHorizontal } from "lucide-react";

type BadgeVariant =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;

function TodoTableRow(todo: Todo) {
    const { name, status, title } = todo;
    const getStatusBadgeForStatus = (status: TodoStatus): BadgeVariant => {
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
        <TableRow>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>
                <Badge variant={getStatusBadgeForStatus(status)}>
                    {status}
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
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
                        href={route("dashboard", {
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
                            href={route("dashboard", {
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
                        href={route("dashboard", { page: todos.current_page })}
                    >
                        {todos.current_page}
                    </PaginationLink>
                </PaginationItem>
                {nextPage < todos.last_page && (
                    <PaginationItem>
                        <PaginationLink
                            preserveScroll
                            href={route("dashboard", {
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
                        href={route("dashboard", { page: nextPage })}
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

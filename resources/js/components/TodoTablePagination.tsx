import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import type { PaginatedModel, Todo } from "@/lib/models";
import type React from "react";

export function TodoPagination(todos: PaginatedModel<Todo>) {
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
                <div className="hidden sm:block">
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
                </div>
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

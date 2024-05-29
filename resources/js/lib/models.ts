export interface PaginatedModel<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    total: number;
}

export interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

export interface Todo {
    id: number;
    name: string;
    status: TodoStatus;
    title: string;
    due_by: string;
}

export type TodoStatus = "Done" | "In Progress" | "Overdue" | "Not Started";

export type PaginatedTodos = PaginatedModel<Todo>;

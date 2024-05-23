export interface PaginatedModel<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    total: number;
}

export interface Link {
    url?: string;
    label: string;
    active: boolean;
}

export interface Todo {
    name: string;
    status: TodoStatus;
    title: string;
}

export type TodoStatus = "Done" | "In Progress" | "Cancelled" | "Not Started";

export interface PaginatedTodos extends PaginatedModel<Todo> {}

import { TodoStats } from "@/components/TodoStats";
import { Todos } from "@/components/TodosTable";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import type { PaginatedModel, Todo } from "@/lib/models";
import type { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    auth,
    todos,
}: PageProps<{ todos: PaginatedModel<Todo>; total: number }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-2 lg:px-8 sm:px-6">
                    <div className="mb-4 grid grid-cols-1 space-x-0 space-y-4 sm:grid-cols-3 sm:space-x-4 sm:space-y-0">
                        <TodoStats />
                        <TodoStats />
                        <TodoStats />
                    </div>
                    <Todos todos={todos} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

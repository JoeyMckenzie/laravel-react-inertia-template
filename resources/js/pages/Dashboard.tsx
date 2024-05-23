import Todos from "@/components/Todos";
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
                <div className="mx-auto max-w-7xl lg:px-8 sm:px-6">
                    <Todos todos={todos} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

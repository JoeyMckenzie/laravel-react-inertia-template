import Todos from "@/components/Todos";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import type { Todo } from "@/types/models";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    auth,
    todos,
    total,
}: PageProps<{ todos: Todo[]; total: number }>) {
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
                    <Todos todos={todos} total={total} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import type { Todo } from "@/lib/models";
import type { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { UpdateTodoForm } from "./partials/UpdateTodoForm";

export default function Edit({ auth, todo }: PageProps<{ todo: Todo }>) {
    <AuthenticatedLayout
        user={auth.user}
        header={
            <h2 className="font-semibold text-xl leading-tight">
                Edit {todo.name}
            </h2>
        }
    >
        <Head title="Dashboard" />

        <div className="py-12">
            <div className="mx-auto max-w-7xl px-2 lg:px-8 sm:px-6">
                <div className="bg-white p-4 shadow sm:rounded-lg dark:bg-black sm:p-8">
                    <UpdateTodoForm className="max-w-xl" />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>;
}

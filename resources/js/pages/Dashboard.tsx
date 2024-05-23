import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }: PageProps) {
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
                    <div className="overflow-hidden bg-accent shadow-sm sm:rounded-lg">
                        <div className="p-6">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

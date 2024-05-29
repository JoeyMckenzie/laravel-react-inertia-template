import InputError from "@/components/InputError";
import { Button } from "@/components/catalyst/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/catalyst/input";
import {
    Field,
    FieldGroup,
    Fieldset,
    Label,
    Legend,
} from "@/components/catalyst/fieldset";
import GuestLayout from "@/layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import type { FormEventHandler } from "react";
import { Text } from "@/components/catalyst/text";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            {status && (
                <div className="mb-4 font-medium text-green-600 text-sm">
                    {status}
                </div>
            )}

            <form
                onSubmit={submit}
                className="w-full max-w-sm rounded-lg p-8 shadow-lg"
            >
                <Fieldset>
                    <Legend>Forgot Password</Legend>
                    <Text>
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link that will allow you to choose a new one.
                    </Text>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </Field>
                        <Field>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Email Password Reset Link
                            </Button>
                        </Field>
                    </FieldGroup>
                </Fieldset>
            </form>
        </GuestLayout>
    );
}

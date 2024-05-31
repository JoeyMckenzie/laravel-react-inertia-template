import { Button } from "@/components/catalyst/button";
import {
    Description,
    Field,
    FieldGroup,
    Fieldset,
    Label,
    Legend,
} from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Link } from "@/components/catalyst/link";
import { Text } from "@/components/catalyst/text";
import type { PageProps } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import type { FormEventHandler } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: { mustVerifyEmail: boolean; status?: string; className?: string }) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6">
                <Fieldset>
                    <Legend>Profile Information</Legend>
                    <Text>
                        Update your account's profile information and email
                        address.
                    </Text>

                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                autoComplete="name"
                            />
                            {errors.name && (
                                <Description className="text-red-500">
                                    {errors.name}
                                </Description>
                            )}
                        </Field>
                        <Field>
                            <Label htmlFor="name">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                autoComplete="username"
                            />
                            {errors.email && (
                                <Description className="text-red-500">
                                    {errors.email}
                                </Description>
                            )}
                        </Field>
                        <Field className="flex items-center gap-4">
                            <Button
                                color="cyan"
                                disabled={processing}
                                type="submit"
                            >
                                Save
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-gray-600 text-sm dark:text-neutral-400">
                                    Saved.
                                </p>
                            </Transition>
                        </Field>
                    </FieldGroup>
                </Fieldset>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                            >
                                <Button>
                                    Click here to re-send the verification
                                    email.
                                </Button>
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-green-600 text-sm">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}
            </form>
        </section>
    );
}

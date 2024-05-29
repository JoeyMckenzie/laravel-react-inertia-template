import { Button } from "@/components/catalyst/button";
import { Input } from "@/components/catalyst/input";
import {
    Description,
    Field,
    FieldGroup,
    Fieldset,
    Label,
    Legend,
} from "@/components/catalyst/fieldset";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { type FormEventHandler, useRef } from "react";
import { Text } from "@/components/catalyst/text";

export default function UpdatePasswordForm({
    className = "",
}: { className?: string }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <Fieldset>
                    <Legend>Update Password</Legend>
                    <Text>
                        Ensure your account is using a long, random password to
                        stay secure.
                    </Text>

                    <FieldGroup>
                        <Field>
                            <Label htmlFor="current_password">
                                Current Password
                            </Label>
                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                            />
                            {errors.current_password && (
                                <Description className="text-red-500">
                                    {errors.current_password}
                                </Description>
                            )}
                        </Field>
                        <Field>
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />
                            {errors.password && (
                                <Description className="text-red-500">
                                    {errors.password}
                                </Description>
                            )}
                        </Field>
                        <Field>
                            <Label htmlFor="password_confirmation">
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />
                            {errors.password_confirmation && (
                                <Description className="text-red-500">
                                    {errors.password_confirmation}
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
            </form>
        </section>
    );
}

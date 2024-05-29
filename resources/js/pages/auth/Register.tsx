import { Button } from "@/components/catalyst/button";
import { Input } from "@/components/catalyst/input";
import GuestLayout from "@/layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Description,
    Field,
    FieldGroup,
    Fieldset,
    Label,
    Legend,
} from "@/components/catalyst/fieldset";
import { type FormEventHandler, useEffect } from "react";
import { Text } from "@/components/catalyst/text";
import { Link } from "@/components/catalyst/link";
import { Heading } from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // biome-ignore lint/correctness/useExhaustiveDependencies: reset only used on mount
    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className="rounded-lg p-8 shadow-lg">
                <Fieldset>
                    <Heading>Register</Heading>
                    <Text>
                        Enter your email and name below to sign up for an
                        account
                    </Text>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                placeholder="Joey Staley"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            {errors.name && (
                                <Description className="text-red-500">
                                    {errors.name}
                                </Description>
                            )}
                        </Field>
                        <Field>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                placeholder="joey.staley74@example.com"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            {errors.email && (
                                <Description className="text-red-500">
                                    {errors.email}
                                </Description>
                            )}
                        </Field>
                        <Field>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
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
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                required
                            />
                            {errors.password_confirmation && (
                                <Description className="text-red-500">
                                    {errors.password_confirmation}
                                </Description>
                            )}
                        </Field>
                        <Field>
                            <Button
                                className="w-full"
                                disabled={processing}
                                color="blue"
                                type="submit"
                            >
                                Sign up
                            </Button>
                        </Field>
                    </FieldGroup>
                    <div className="mt-4 text-center text-sm">
                        <Link href={route("login")} className="underline">
                            Have an account?
                        </Link>
                    </div>
                </Fieldset>
            </form>
        </GuestLayout>
    );
}

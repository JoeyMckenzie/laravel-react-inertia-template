import { Button } from "@/components/catalyst/button";
import { Input } from "@/components/catalyst/input";
import { Description, Field, Label } from "@/components/catalyst/fieldset";
import {
    Dialog,
    DialogActions,
    DialogBody,
    DialogDescription,
    DialogTitle,
} from "@/components/catalyst/dialog";
import { cn } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { type FormEventHandler, useRef, useState } from "react";

export default function DeleteUserForm({
    className = "",
}: { className?: string }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <section className={cn("space-y-6", className)}>
            <header className="mb-6">
                <h2 className="font-medium text-lg">Delete Account</h2>

                <p className="mt-1 text-gray-600 text-sm dark:text-neutral-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Button onClick={() => setOpen(true)} color="red">
                Delete Account
            </Button>

            <Dialog open={open} onClose={setOpen}>
                <form onSubmit={deleteUser}>
                    <DialogTitle>
                        Are you sure you want to delete your account?
                    </DialogTitle>
                    <DialogDescription>
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </DialogDescription>
                    <DialogBody>
                        <Field>
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="mt-1 block w-full"
                                placeholder="Password"
                            />
                            {errors.password && (
                                <Description className="text-red-500">
                                    {errors.password}
                                </Description>
                            )}
                        </Field>
                    </DialogBody>
                    <DialogActions>
                        <Button plain onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="red"
                            className="ms-3"
                            disabled={processing}
                        >
                            Delete Account
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </section>
    );
}

import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import type { PaginatedModel, Todo, TodoStatus } from "@/lib/models";
import { cn } from "@/lib/utils";
import { TodoPagination } from "@/pages/todos/partials/TodoTablePagination";
import { TodoTableRow } from "@/pages/todos/partials/TodoTableRow";
import { useForm } from "@inertiajs/react";
import { format } from "date-fns";
import { CalendarIcon, CirclePlus } from "lucide-react";
import { type FormEventHandler, useEffect, useRef, useState } from "react";

const selectableStatuses: TodoStatus[] = ["Not Started", "In Progress", "Done"];

export function TodosTable({
    todos,
}: {
    todos: PaginatedModel<Todo>;
}) {
    const titleInput = useRef<HTMLInputElement>(null);
    const statusInput = useRef<HTMLInputElement>(null);
    const dueByDateInput = useRef<HTMLDivElement>(null);
    const [createTodoModalOpen, setCreateTodoModalOpen] = useState(false);
    const { toast } = useToast();

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm<{
        title: string;
        status: TodoStatus;
        due_by: Date;
    }>({
        title: "",
        status: "Not Started",
        due_by: new Date(),
    });

    const createTodo: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("todos.store"), {
            onSuccess: () => {
                reset();
                setCreateTodoModalOpen(false);
                toast({
                    title: "Scheduled: Catch up",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                });
            },
            onError: (errors) => {
                if (errors.title) {
                    reset("title");
                    titleInput.current?.focus();
                }

                if (errors.status) {
                    reset("status");
                    statusInput.current?.focus();
                }

                if (errors.due_by) {
                    reset("due_by");
                    dueByDateInput.current?.focus();
                }
            },
        });
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-y-1">
                    <CardTitle>Todos</CardTitle>
                    <CardDescription className="hidden sm:block">
                        Manage your todos for the day, week, or whenever.
                    </CardDescription>
                </div>
                <Dialog
                    open={createTodoModalOpen}
                    onOpenChange={setCreateTodoModalOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="flex flex-row gap-x-2">
                            Add todo
                            <CirclePlus className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create todo</DialogTitle>
                            <DialogDescription>
                                Create a todo with a title, status, and due by
                                date.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={createTodo}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        ref={titleInput}
                                        placeholder="Create a Laravel starter kit with React"
                                        className="col-span-3"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="grid gap-2">
                                        <Label>Status</Label>
                                        <Select
                                            onValueChange={(
                                                status: TodoStatus,
                                            ) => setData("status", status)}
                                            defaultValue={data.status}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Status
                                                    </SelectLabel>
                                                    {selectableStatuses.map(
                                                        (status) => (
                                                            <SelectItem
                                                                key={status}
                                                                value={status}
                                                            >
                                                                {status}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.status} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Due by</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "justify-start text-left font-normal",
                                                        !data.due_by &&
                                                            "text-muted-foreground",
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 size-4" />
                                                    {data.due_by ? (
                                                        format(
                                                            data.due_by,
                                                            "PPP",
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                ref={dueByDateInput}
                                                className="w-full p-0"
                                            >
                                                <Calendar
                                                    fromDate={new Date()}
                                                    mode="single"
                                                    selected={data.due_by}
                                                    initialFocus
                                                    onSelect={(e) =>
                                                        setData(
                                                            "due_by",
                                                            e ?? new Date(),
                                                        )
                                                    }
                                                />
                                            </PopoverContent>
                                            <InputError
                                                message={errors.due_by}
                                            />
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={processing}>
                                    Create
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Due by</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {todos.data.map((todo) => (
                            <TodoTableRow key={todo.name} {...todo} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex flex-col gap-y-4">
                <TodoPagination {...todos} />
                <div className="text-muted-foreground text-xs">
                    Showing{" "}
                    <strong>
                        {todos.from}-{todos.to}
                    </strong>{" "}
                    of <strong>{todos.total}</strong> todos
                </div>
            </CardFooter>
        </Card>
    );
}

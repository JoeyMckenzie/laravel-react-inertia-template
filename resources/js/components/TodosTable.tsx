import { TodoPagination } from "@/components/TodoTablePagination";
import { TodoTableRow } from "@/components/TodoTableRow";
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
import type { PaginatedModel, Todo } from "@/lib/models";
import { cn } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { format } from "date-fns";
import { CalendarIcon, CirclePlus } from "lucide-react";
import { useState } from "react";

export function TodosTable({
    todos,
}: {
    todos: PaginatedModel<Todo>;
}) {
    const [date, setDate] = useState<Date>();
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        status: "",
        dueBy: new Date(),
    });

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-y-1">
                    <CardTitle>Todos</CardTitle>
                    <CardDescription className="hidden sm:block">
                        Manage your todos for the day, week, or whenever.
                    </CardDescription>
                </div>
                <Dialog>
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
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Create a Laravel starter kit with React"
                                    className="col-span-3"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Status</Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="apple">
                                                Apple
                                            </SelectItem>
                                            <SelectItem value="banana">
                                                Banana
                                            </SelectItem>
                                            <SelectItem value="blueberry">
                                                Blueberry
                                            </SelectItem>
                                            <SelectItem value="grapes">
                                                Grapes
                                            </SelectItem>
                                            <SelectItem value="pineapple">
                                                Pineapple
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Due by</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] justify-start text-left font-normal",
                                                !date &&
                                                    "text-muted-foreground",
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 size-4" />
                                            {date ? (
                                                format(date, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
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

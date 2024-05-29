import { Badge, type badgeColors } from "@/components/catalyst/badge";
import { TableCell, TableRow } from "@/components/catalyst/table";
import type { Todo } from "@/lib/models";
import { format } from "date-fns";
import {
    BadgeCheck,
    CalendarClock,
    CircleSlash,
    type LucideProps,
    MoreHorizontal,
    Sparkles,
} from "lucide-react";
import type React from "react";
import {
    Dropdown,
    DropdownButton,
    DropdownDivider,
    DropdownHeading,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
} from "@/components/catalyst/dropdown";

export function TodoTableRow(todo: Todo) {
    const { name, status: currentStatus, title } = todo;

    const getStatusBadgeForStatus = (): {
        color: keyof typeof badgeColors;
        icon: (props: LucideProps) => React.JSX.Element;
    } => {
        switch (currentStatus) {
            case "Done":
                return {
                    color: "green",
                    icon: (props: LucideProps) => <BadgeCheck {...props} />,
                };
            case "Overdue":
                return {
                    color: "orange",
                    icon: (props: LucideProps) => <CalendarClock {...props} />,
                };
            case "In Progress":
                return {
                    color: "blue",
                    icon: (props: LucideProps) => <Sparkles {...props} />,
                };
            default:
                return {
                    color: "zinc",
                    icon: (props: LucideProps) => <CircleSlash {...props} />,
                };
        }
    };

    const statusBadge = getStatusBadgeForStatus();
    const formattedDate = format(todo.due_by, "PP");

    return (
        <TableRow>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>
                <Badge color={statusBadge.color}>
                    <statusBadge.icon className="mr-2 h-4 w-4" />
                    {currentStatus}
                </Badge>
            </TableCell>
            <TableCell className="truncate">{title}</TableCell>
            <TableCell>{formattedDate}</TableCell>
            <TableCell>
                <Dropdown>
                    <DropdownButton>
                        <MoreHorizontal className="h-4 w-4" />
                    </DropdownButton>
                    <DropdownMenu>
                        <DropdownSection aria-label="My Account">
                            <DropdownHeading>Actions</DropdownHeading>
                            <DropdownItem
                                href={route("todos.show", todo.id)}
                                className="w-full"
                            >
                                Edit
                            </DropdownItem>
                            <DropdownItem
                                preserveScroll
                                href={route("todos.destroy", todo.id)}
                                method="delete"
                                as="button"
                                color="red"
                            >
                                Delete
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </TableCell>
        </TableRow>
    );
}

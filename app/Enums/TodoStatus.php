<?php

declare(strict_types=1);

namespace App\Enums;

enum TodoStatus: string
{
    case NOT_STARTED = 'Not Started';

    case IN_PROGRESS = 'In Progress';

    case DONE = 'Done';

    case CANCELLED = 'Cancelled';

    /**
     * @return string[]
     */
    public static function toArray(): array
    {
        /** @var string[] $statuses */
        $statuses = collect(self::cases())
            ->map(fn (TodoStatus $status) => $status->value)
            ->toArray();

        return $statuses;
    }
}

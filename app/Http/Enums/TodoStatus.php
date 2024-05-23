<?php

declare(strict_types=1);

namespace App\Enums;

enum TodoStatus: string
{
    case NOT_STARTED = 'not_started';

    case IN_PROGRESS = 'in_progress';

    case DONE = 'done';

    case CANCELLED = 'cancelled';

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

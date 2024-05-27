<?php

declare(strict_types=1);

namespace App\ValueObjects;

use App\Enums\TodoStatus;
use App\Models\Todo;
use Illuminate\Database\Eloquent\Collection;

final readonly class TodoMetadata
{
    public int $completed;

    public int $inProgress;

    public int $notStarted;

    /**
     * @param  null|Collection<int, Todo>  $todos
     */
    public function __construct(mixed $todos)
    {
        $this->completed = $todos?->where('status', TodoStatus::DONE->value)->count() ?? 0;
        $this->inProgress = $todos?->where('status', TodoStatus::IN_PROGRESS->value)->count() ?? 0;
        $this->notStarted = $todos?->where('status', TodoStatus::NOT_STARTED->value)->count() ?? 0;
    }
}

<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Todo extends Model
{
    use HasFactory;

    /**
     * @return BelongsTo<User, Todo>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

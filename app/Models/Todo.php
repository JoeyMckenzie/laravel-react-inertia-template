<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Todo extends Model
{
    use HasFactory;

    public $fillable = [
        'title',
        'status',
        'due_by',
        'name',
    ];

    public static function getNextName(): string
    {
        // Extract the numeric part from the names and find the maximum value
        $maxNumber = self::query()
            ->where('name', 'like', 'TODO-%')
            ->selectRaw('MAX(CAST(SUBSTRING(name, 6) AS UNSIGNED)) as max_number')
            ->pluck('max_number')
            ->first();

        // Increment the maximum value by 1
        $nextNumber = $maxNumber ? $maxNumber + 1 : 1;

        // Return the new name
        return 'TODO-'.$nextNumber;
    }

    /**
     * @return BelongsTo<User, Todo>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

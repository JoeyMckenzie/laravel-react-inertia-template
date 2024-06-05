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
        /** @var int|null $maxNumber */
        $maxNumber = self::query()
            ->where('name', 'like', 'TODO-%')
            ->selectRaw('MAX(CAST(SUBSTRING(name, 6) AS UNSIGNED)) as max_number')
            ->value('max_number');

        // Increment the maximum value by 1
        $nextNumber = is_null($maxNumber) ? 1 : $maxNumber + 1;

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

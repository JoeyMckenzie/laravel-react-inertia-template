<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\TodoStatus;
use App\Models\Todo;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Todo>
 */
final class TodoFactory extends Factory
{
    private static int $todo = 1;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user1Id = User::firstWhere('email', 'test@example.com')?->id;
        $user2Id = User::firstWhere('email', 'testuser1@gmail.com')?->id;
        $dueBy = fake()->dateTimeBetween('-1 month', '+1 month');
        $statusesWithoutOverdue = collect(TodoStatus::toArray())->filter(fn (string $status): bool => $status !== TodoStatus::OVERDUE->value)->toArray();
        $status = (new Carbon($dueBy))->isBefore(Carbon::now())
            ? TodoStatus::OVERDUE->value
            : fake()->randomElement($statusesWithoutOverdue);

        return [
            'name' => 'TODO-'.self::$todo++,
            'title' => fake()->text(100),
            'status' => $status,
            'due_by' => $dueBy,
            'user_id' => fake()->randomElement([$user1Id, $user2Id]),
        ];
    }
}

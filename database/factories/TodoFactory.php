<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\TodoStatus;
use App\Models\Todo;
use App\Models\User;
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
        return [
            'name' => 'TODO-'.self::$todo++,
            'title' => fake()->text(100),
            'status' => fake()->randomElement(TodoStatus::toArray()),
            'user_id' => User::first(['id'])?->id,
        ];
    }
}

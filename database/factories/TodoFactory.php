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
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'TOOD-1',
            'title' => fake()->text(),
            'status' => fake()->randomElement(TodoStatus::toArray()),
            'user_id' => User::first(['id'])?->id,
        ];
    }
}

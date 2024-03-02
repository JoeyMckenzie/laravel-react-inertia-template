<?php

namespace Database\Factories;

use App\Models\JobListingTag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobListingTag>
 */
class JobListingTagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tag' => fake()->word(),
        ];
    }
}

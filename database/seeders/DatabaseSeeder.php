<?php

namespace Database\Seeders;

use App\Models\JobListing;
use App\Models\JobListingTag;
use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        JobListingTag::factory(10)->create();
        JobListing::factory(10)->create();

        $tags = JobListingTag::all();
        $jobListing = JobListing::all();

        $jobListing->each(function (JobListing $jobListing) use ($tags) {
            $seededTags = $tags
                ->random(rand(1, count($tags)))->pluck('id')
                ->toArray();
            $jobListing->tags()->attach($seededTags);
        });
    }
}

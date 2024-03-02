<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class JobListing extends Model
{
    use HasFactory;

    /**
     * @return BelongsToMany<JobListingTag>
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(JobListingTag::class);
    }
}

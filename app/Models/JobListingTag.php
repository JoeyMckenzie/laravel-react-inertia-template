<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class JobListingTag extends Model
{
    use HasFactory;

    /**
     * @return BelongsToMany<JobListing>
     */
    public function jobListings(): BelongsToMany
    {
        return $this->belongsToMany(JobListing::class);
    }
}

<?php

use App\Enums\ListingStatus;
use App\Enums\PayType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->text('title');
            $table->text('description');
            $table->text('url');
            $table->integer('pay_start')->nullable();
            $table->integer('pay_end')->nullable();
            $table->enum('pay_type', PayType::toArray())->nullable();
            $table->enum('status', ListingStatus::toArray());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_listings');
    }
};

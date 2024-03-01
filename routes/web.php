<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
]))->name('welcome');

Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function (): void {
    Route::get('/profile', (new ProfileController())->edit(...))->name('profile.edit');
    Route::patch('/profile', (new ProfileController())->update(...))->name('profile.update');
    Route::delete('/profile', (new ProfileController())->destroy(...))->name('profile.destroy');
});

require __DIR__.'/auth.php';

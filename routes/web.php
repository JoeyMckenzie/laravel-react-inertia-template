<?php

declare(strict_types=1);

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
]));

Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function (): void {
    Route::get('/profile', fn (Illuminate\Http\Request $request): \Inertia\Response => (new ProfileController())->edit($request))->name('profile.edit');
    Route::patch('/profile', fn (App\Http\Requests\ProfileUpdateRequest $request): \Illuminate\Http\RedirectResponse => (new ProfileController())->update($request))->name('profile.update');
    Route::delete('/profile', fn (Illuminate\Http\Request $request): \Illuminate\Http\RedirectResponse => (new ProfileController())->destroy($request))->name('profile.destroy');
});

require __DIR__.'/auth.php';

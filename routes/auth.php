<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function (): void {
    Route::get('register', fn (): \Inertia\Response => (new RegisteredUserController())->create())
        ->name('register');

    Route::post('register', fn (Illuminate\Http\Request $request): \Illuminate\Http\RedirectResponse => (new RegisteredUserController())->store($request));

    Route::get('login', fn (): \Inertia\Response => (new AuthenticatedSessionController())->create())
        ->name('login');

    Route::post('login', fn (App\Http\Requests\Auth\LoginRequest $request): \Illuminate\Http\RedirectResponse => (new AuthenticatedSessionController())->store($request));

    Route::get('forgot-password', fn (): \Inertia\Response => (new PasswordResetLinkController())->create())
        ->name('password.request');

    Route::post('forgot-password', fn (Illuminate\Http\Request $request): \Illuminate\Http\RedirectResponse => (new PasswordResetLinkController())->store($request))
        ->name('password.email');

    Route::get('reset-password/{token}', fn (Illuminate\Http\Request $request): \Inertia\Response => (new NewPasswordController())->create($request))
        ->name('password.reset');

    Route::post('reset-password', fn (Illuminate\Http\Request $request): \Illuminate\Http\RedirectResponse => (new NewPasswordController())->store($request))
        ->name('password.store');
});

Route::middleware('auth')->group(function (): void {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', fn (Illuminate\Http\Request $request): \Illuminate\Http\RedirectResponse => (new EmailVerificationNotificationController())->store($request))
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', fn (): \Inertia\Response => (new ConfirmablePasswordController())->show())
        ->name('password.confirm');

    Route::post('confirm-password', fn (Illuminate\Http\Request $request): \Illuminate\Http\RedirectResponse => (new ConfirmablePasswordController())->store($request));

    Route::put('password', fn (Illuminate\Http\Request $request): \Illuminate\Http\RedirectResponse => (new PasswordController())->update($request))->name('password.update');

    Route::post('logout', fn (Illuminate\Http\Request $request): \Illuminate\Http\RedirectResponse => (new AuthenticatedSessionController())->destroy($request))
        ->name('logout');
});

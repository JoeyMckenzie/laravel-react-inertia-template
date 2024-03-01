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
    Route::get('register', (new RegisteredUserController())->create(...))
        ->name('register');

    Route::post('register', (new RegisteredUserController())->store(...));

    Route::get('login', (new AuthenticatedSessionController())->create(...))
        ->name('login');

    Route::post('login', (new AuthenticatedSessionController())->store(...));

    Route::get('forgot-password', (new PasswordResetLinkController())->create(...))
        ->name('password.request');

    Route::post('forgot-password', (new PasswordResetLinkController())->store(...))
        ->name('password.email');

    Route::get('reset-password/{token}', (new NewPasswordController())->create(...))
        ->name('password.reset');

    Route::post('reset-password', (new NewPasswordController())->store(...))
        ->name('password.store');
});

Route::middleware('auth')->group(function (): void {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', (new EmailVerificationNotificationController())->store(...))
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', (new ConfirmablePasswordController())->show(...))
        ->name('password.confirm');

    Route::post('confirm-password', (new ConfirmablePasswordController())->store(...));

    Route::put('password', (new PasswordController())->update(...))->name('password.update');

    Route::post('logout', (new AuthenticatedSessionController())->destroy(...))
        ->name('logout');
});

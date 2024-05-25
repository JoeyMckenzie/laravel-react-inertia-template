<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user()?->hasVerifiedEmail() ?? false
            ? redirect()->intended(route('todos.index', absolute: false))
            : Inertia::render('auth/VerifyEmail', ['status' => session('status')]);
    }
}

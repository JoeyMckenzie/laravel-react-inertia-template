<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Todo;
use Inertia\Inertia;
use Inertia\Response;

final class TodoController extends Controller
{
    public function index(): Response
    {
        $todos = auth()->user()?->todos()->get(['title', 'name', 'status']);

        return Inertia::render('Dashboard', [
            'todos' => $todos,
            'total' => Todo::count(),
        ]);
    }
}

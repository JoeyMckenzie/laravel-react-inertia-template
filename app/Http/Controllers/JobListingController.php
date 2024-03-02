<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class JobListingController extends Controller
{
    /**
     * Display a listing of the resou=rce.
     */
    public function index(): Response
    {
        return Inertia::render('Dashboard');
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        // Redirect to home page since registration is invitation-only
        return Inertia::render('welcome');
    }

    /**
     * Handle an incoming registration request.
     * This should not be used since registration is invitation-only.
     */
    public function store(): RedirectResponse
    {
        // Redirect to home page since registration is invitation-only
        return redirect()->route('home');
    }
}

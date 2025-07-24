<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\AuthSettingsService;
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
        // Check if registration is allowed
        if (!AuthSettingsService::isRegistrationAllowed()) {
            // Redirect to home page since registration is not allowed
            return Inertia::render('welcome');
        }

        return Inertia::render('auth/register', [
            'authSettings' => AuthSettingsService::getSettingsArray(),
        ]);
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(): RedirectResponse
    {
        // Check if registration is allowed
        if (!AuthSettingsService::isRegistrationAllowed()) {
            return redirect()->route('home');
        }

        // Registration logic would go here
        return redirect()->route('home');
    }
}

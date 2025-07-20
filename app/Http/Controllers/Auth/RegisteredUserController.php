<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Invitation;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'invitation_code' => 'required|string|exists:invitations,code',
        ]);

        // Find and validate the invitation
        $invitation = Invitation::where('code', $request->invitation_code)->first();

        if (!$invitation || !$invitation->isValid()) {
            return back()->withErrors([
                'invitation_code' => 'Invalid or expired invitation code.',
            ]);
        }

        // Check if invitation is for specific email
        if ($invitation->email && $invitation->email !== $request->email) {
            return back()->withErrors([
                'invitation_code' => 'This invitation is for a different email address.',
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $invitation->role,
        ]);

        // Mark invitation as used
        $invitation->markAsUsed($user->id);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('dashboard', absolute: false));
    }
}

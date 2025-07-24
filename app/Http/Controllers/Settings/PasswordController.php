<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordController extends Controller
{
    /**
     * Show the user's password settings page.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('settings/password', [
            'user' => [
                'is_pure_social_user' => $user->isPureSocialUser(),
                'social_provider' => $user->getSocialProviderName(),
            ],
        ]);
    }

    /**
     * Update the user's password or set initial password for social users.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->isPureSocialUser()) {
            // For pure social users, set initial password (no current password required)
            $validated = $request->validate([
                'password' => ['required', Password::defaults(), 'confirmed'],
            ]);

            $user->update([
                'password' => Hash::make($validated['password']),
            ]);

            return back()->with('success', 'Password set successfully! You can now use both social login and email/password login.');
        } else {
            // For regular users, require current password
            $validated = $request->validate([
                'current_password' => ['required', 'current_password'],
                'password' => ['required', Password::defaults(), 'confirmed'],
            ]);

            $user->update([
                'password' => Hash::make($validated['password']),
            ]);

            return back()->with('success', 'Password updated successfully!');
        }
    }
}

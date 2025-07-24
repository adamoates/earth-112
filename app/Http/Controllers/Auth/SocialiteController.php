<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Redirect the user to the OAuth provider.
     */
    public function redirect(string $provider): RedirectResponse
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Handle the OAuth callback.
     */
    public function callback(string $provider): RedirectResponse
    {
        try {
            $socialUser = Socialite::driver($provider)->user();

            // Check if there's a valid, unused invitation for this email
            $invitation = Invitation::where('email', $socialUser->getEmail())
                ->where('expires_at', '>', now())
                ->whereNull('used_at')
                ->first();

            if (!$invitation) {
                Log::warning('Google OAuth login attempted without valid invitation', [
                    'email' => $socialUser->getEmail(),
                    'provider' => $provider
                ]);

                return redirect()->route('login')
                    ->withErrors(['email' => 'You need a valid invitation to access this application.']);
            }

            // Check if user already exists
            $user = User::where('email', $socialUser->getEmail())->first();

            if (!$user) {
                // Create new user
                $user = User::create([
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'email_verified_at' => now(), // Google emails are verified
                    'password' => Hash::make(Str::random(64)), // Random password since they use OAuth
                ]);

                Log::info('New user created via Google OAuth', [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'invitation_id' => $invitation->id
                ]);
            }

            // Assign role from invitation
            if (!$user->hasRole($invitation->role)) {
                $user->assignRole($invitation->role);
            }

            // Mark invitation as used
            $invitation->update([
                'used_at' => now(),
            ]);

            // Log in the user
            Auth::login($user);

            Log::info('User logged in via Google OAuth', [
                'user_id' => $user->id,
                'email' => $user->email,
                'role' => $invitation->role
            ]);

            return redirect()->intended(route('dashboard', absolute: false));
        } catch (\Exception $e) {
            Log::error('Google OAuth callback error', [
                'provider' => $provider,
                'error' => $e->getMessage()
            ]);

            return redirect()->route('login')
                ->withErrors(['email' => 'An error occurred during authentication. Please try again.']);
        }
    }
}

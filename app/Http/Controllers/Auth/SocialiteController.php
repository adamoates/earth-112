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

            Log::info('Google OAuth callback initiated', [
                'provider' => $provider,
                'social_email' => $socialUser->getEmail(),
                'social_id' => $socialUser->getId(),
            ]);

            // Check if user already exists first
            $user = User::where('email', $socialUser->getEmail())->first();
            $isNewUser = !$user;

            if ($isNewUser) {
                // For new users, we need a valid unused invitation
                $invitation = Invitation::where('email', $socialUser->getEmail())
                    ->where('expires_at', '>', now())
                    ->whereNull('used_at')
                    ->first();

                if (!$invitation) {
                    Log::warning('No valid invitation found for new social user', [
                        'email' => $socialUser->getEmail(),
                        'provider' => $provider,
                        'available_invitations' => Invitation::where('email', $socialUser->getEmail())->get()->map(function ($inv) {
                            return [
                                'id' => $inv->id,
                                'expires_at' => $inv->expires_at,
                                'used_at' => $inv->used_at,
                                'role' => $inv->role,
                            ];
                        })
                    ]);

                    return redirect()->route('social.status', [
                        'status' => 'error',
                        'message' => 'You need a valid invitation to access this application. Please contact an administrator.',
                        'provider' => ucfirst($provider)
                    ]);
                }

                Log::info('Valid invitation found for new user', [
                    'invitation_id' => $invitation->id,
                    'role' => $invitation->role,
                    'expires_at' => $invitation->expires_at,
                ]);

                // Create new user
                $user = User::create([
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'email_verified_at' => now(), // Google emails are verified
                    'password' => Hash::make(Str::random(64)), // Random password since they use OAuth
                    'social_provider' => $provider,
                    'social_id' => $socialUser->getId(),
                    'is_social_user' => true,
                ]);

                Log::info('New user created via Google OAuth', [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'invitation_id' => $invitation->id,
                    'provider' => $provider
                ]);

                // Assign role from invitation
                if (!$user->hasRole($invitation->role)) {
                    $user->assignRole($invitation->role);
                    Log::info('Assigned role to new user', ['role' => $invitation->role]);
                }

                // Mark invitation as used
                $invitation->update([
                    'used_at' => now(),
                ]);
            } else {
                // For existing users, just log them in
                Log::info('Existing user found for social login', [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'is_social_user' => $user->isSocialUser(),
                ]);

                // Update existing user with social info if not already set
                if (!$user->isSocialUser()) {
                    $user->update([
                        'social_provider' => $provider,
                        'social_id' => $socialUser->getId(),
                        'is_social_user' => true,
                    ]);
                    Log::info('Updated existing user with social info');
                }

                // Get their current role for display
                $userRole = $user->roles->first()?->name ?? 'No role assigned';
            }

            // Log in the user
            Auth::login($user);

            // Get the role for display (either from invitation for new users or current role for existing users)
            $displayRole = $isNewUser ? $invitation->role : ($user->roles->first()?->name ?? 'No role assigned');

            Log::info('User logged in via Google OAuth', [
                'user_id' => $user->id,
                'email' => $user->email,
                'role' => $displayRole,
                'provider' => $provider
            ]);

            // Show success status page briefly before redirecting
            return redirect()->route('social.status', [
                'status' => 'success',
                'message' => $isNewUser
                    ? 'Your account has been created successfully and you are now logged in!'
                    : 'Welcome back! You have been logged in successfully.',
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $displayRole
                ],
                'isNewUser' => $isNewUser,
                'provider' => ucfirst($provider)
            ]);
        } catch (\Exception $e) {
            Log::error('Google OAuth callback error', [
                'provider' => $provider,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->route('social.status', [
                'status' => 'error',
                'message' => 'An error occurred during authentication. Please try again.',
                'provider' => ucfirst($provider)
            ]);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\InviteUserRequest;
use App\Models\Invitation;
use App\Models\User;
use App\Notifications\InviteUserNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class InvitationController extends Controller
{
    /**
     * Display a listing of invitations.
     */
    public function index(): Response
    {
        $invitations = Invitation::with('creator')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('invitations/index', [
            'invitations' => $invitations,
        ]);
    }

    /**
     * Show the form for creating a new invitation.
     */
    public function create(): Response
    {
        return Inertia::render('invitations/create');
    }

    /**
     * Store a newly created invitation.
     */
    public function store(InviteUserRequest $request)
    {
        try {
            // Generate a secure token
            $token = Hash::make(Str::random(64));

            // Create invitation with 48-hour expiry
            $invitation = Invitation::create([
                'email' => $request->email,
                'token' => $token,
                'role' => $request->role,
                'expires_at' => $request->expires_at ?? now()->addHours(48),
                'created_by' => $request->user()->id,
            ]);

            // Send invitation email
            $invitation->notify(new InviteUserNotification($invitation));

            return redirect()->route('invitations.index')
                ->with('success', 'Invitation sent successfully to ' . $request->email);
        } catch (\Exception $e) {
            Log::error('Invitation send failed: ' . $e->getMessage());
            return back()->withErrors(['email' => 'Failed to send invitation. Please try again or contact support.']);
        }
    }

    /**
     * Display the specified invitation.
     */
    public function show(Invitation $invitation): Response
    {
        $invitation->load('creator');

        return Inertia::render('invitations/show', [
            'invitation' => $invitation,
        ]);
    }

    /**
     * Show the form for editing the specified invitation.
     */
    public function edit(Invitation $invitation): Response
    {
        return Inertia::render('invitations/edit', [
            'invitation' => $invitation,
        ]);
    }

    /**
     * Update the specified invitation.
     */
    public function update(Request $request, Invitation $invitation)
    {
        $request->validate([
            'email' => 'required|email|max:255',
            'role' => 'required|in:admin,editor,viewer',
            'expires_at' => 'nullable|date|after:now',
        ]);

        $invitation->update([
            'email' => $request->email,
            'role' => $request->role,
            'expires_at' => $request->expires_at,
        ]);

        return redirect()->route('invitations.index')
            ->with('success', 'Invitation updated successfully.');
    }

    /**
     * Remove the specified invitation.
     */
    public function destroy(Invitation $invitation)
    {
        $invitation->delete();

        return redirect()->route('invitations.index')
            ->with('success', 'Invitation deleted successfully.');
    }

    /**
     * Show the invitation acceptance form.
     */
    public function accept(string $token): Response
    {
        $invitation = Invitation::where('token', $token)->first();

        if (!$invitation || !$invitation->isValid()) {
            abort(404, 'Invalid or expired invitation.');
        }

        return Inertia::render('auth/register', [
            'invitation' => [
                'email' => $invitation->email,
                'role' => $invitation->role,
                'token' => $invitation->token,
            ],
        ]);
    }

    /**
     * Process the invitation acceptance and create user.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:8|confirmed',
            'token' => 'required|string',
        ]);

        $invitation = Invitation::where('token', $request->token)->first();

        if (!$invitation || !$invitation->isValid()) {
            abort(404, 'Invalid or expired invitation.');
        }

        if ($invitation->email !== $request->email) {
            abort(400, 'Email address does not match invitation.');
        }

        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'email_verified_at' => now(),
        ]);

        // Assign role
        $user->assignRole($invitation->role);

        // Mark invitation as used
        $invitation->update([
            'used_at' => now(),
        ]);

        // Log in the user
        Auth::login($user);

        return redirect()->route('dashboard')
            ->with('success', 'Account created successfully! Welcome to Earth-112.');
    }

    /**
     * Resend invitation email.
     */
    public function resend(Invitation $invitation)
    {
        if (!$invitation->isValid()) {
            return back()->with('error', 'Cannot resend expired or used invitation.');
        }

        $invitation->notify(new InviteUserNotification($invitation));

        return back()->with('success', 'Invitation email resent successfully.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvitationController extends Controller
{
    /**
     * Display a listing of invitations (admin only).
     */
    public function index()
    {
        $invitations = Invitation::with(['creator', 'usedBy'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($invitation) {
                return [
                    'id' => $invitation->id,
                    'code' => $invitation->code,
                    'email' => $invitation->email,
                    'name' => $invitation->name,
                    'role' => $invitation->role,
                    'role_display' => $invitation->role === 'admin' ? 'Administrator' : 'User',
                    'is_used' => $invitation->is_used,
                    'expires_at' => $invitation->expires_at?->format('Y-m-d H:i:s'),
                    'created_at' => $invitation->created_at->format('Y-m-d H:i:s'),
                    'used_at' => $invitation->used_at?->format('Y-m-d H:i:s'),
                    'creator_name' => $invitation->creator?->name,
                    'used_by_name' => $invitation->usedBy?->name,
                    'is_valid' => $invitation->isValid(),
                ];
            });

        return Inertia::render('invitations/index', [
            'invitations' => $invitations,
        ]);
    }

    /**
     * Show the form for creating a new invitation (admin only).
     */
    public function create()
    {
        return Inertia::render('invitations/create');
    }

    /**
     * Store a newly created invitation (admin only).
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'nullable|email',
            'name' => 'nullable|string|max:255',
            'role' => 'required|in:admin,user',
            'expires_at' => 'nullable|date|after:now',
        ]);

        $invitation = Invitation::createInvitation([
            'email' => $request->email,
            'name' => $request->name,
            'role' => $request->role,
            'expires_at' => $request->expires_at,
            'created_by' => auth()->user()->id,
        ]);

        return redirect()->route('invitations.index')
            ->with('success', "Invitation created successfully! Code: {$invitation->code}");
    }

    /**
     * Remove the specified invitation (admin only).
     */
    public function destroy(Invitation $invitation)
    {
        if ($invitation->is_used) {
            return back()->with('error', 'Cannot delete a used invitation.');
        }

        $invitation->delete();

        return redirect()->route('invitations.index')
            ->with('success', 'Invitation deleted successfully.');
    }

    /**
     * Resend invitation email (admin only).
     */
    public function resend(Invitation $invitation)
    {
        if ($invitation->is_used) {
            return back()->with('error', 'Cannot resend a used invitation.');
        }

        if (!$invitation->email) {
            return back()->with('error', 'Cannot resend invitation without email address.');
        }

        // Here you would send the invitation email
        // For now, we'll just return success
        return back()->with('success', "Invitation code {$invitation->code} is ready to share.");
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Invitation;
use App\Models\AccessRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of users (admin only).
     */
    public function index()
    {
        $users = User::with('roles')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roles->first()?->name ?? 'viewer',
                'role_display' => $user->roles->first()?->name ?? 'Viewer',
                'created_at' => $user->created_at->format('Y-m-d H:i:s'),
            ];
        });

        // Get recent invitations
        $invitations = Invitation::with('creator')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($invitation) {
                return [
                    'id' => $invitation->id,
                    'email' => $invitation->email,
                    'role' => $invitation->role,
                    'expires_at' => $invitation->expires_at?->toISOString(),
                    'used_at' => $invitation->used_at?->toISOString(),
                    'created_at' => $invitation->created_at->toISOString(),
                    'creator' => $invitation->creator ? [
                        'name' => $invitation->creator->name,
                    ] : null,
                ];
            });

        // Get enhanced stats
        $stats = [
            'total_users' => User::count(),
            'admin_users' => User::role('admin')->count(),
            'regular_users' => User::role(['editor', 'viewer'])->count(),
            'active_invitations' => Invitation::whereNull('used_at')
                ->where(function ($query) {
                    $query->whereNull('expires_at')
                        ->orWhere('expires_at', '>', now());
                })->count(),
            'pending_requests' => AccessRequest::where('status', 'pending')->count(),
        ];

        return Inertia::render('users/index', [
            'users' => $users,
            'invitations' => $invitations,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for editing a user (admin only).
     */
    public function edit(User $user)
    {
        // Get all available roles and sort alphabetically
        $roles = \Spatie\Permission\Models\Role::all()
            ->sortBy('name')
            ->map(function ($role) {
                return [
                    'name' => $role->name,
                    'display' => ucfirst($role->name),
                ];
            });

        return Inertia::render('users/edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roles->first()?->name ?? 'viewer',
                'role_display' => $user->roles->first()?->name ?? 'Viewer',
            ],
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified user (admin only).
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,editor,viewer,owner',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // Update role
        $user->syncRoles([$request->role]);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user (admin only).
     */
    public function destroy(Request $request, User $user)
    {
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}

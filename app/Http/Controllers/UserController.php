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
        $users = User::all()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'role_display' => $user->getRoleDisplayName(),
                'created_at' => $user->created_at->format('Y-m-d H:i:s'),
            ];
        });

        // Get enhanced stats
        $stats = [
            'total_users' => User::count(),
            'admin_users' => User::where('role', 'admin')->count(),
            'regular_users' => User::where('role', 'user')->count(),
            'active_invitations' => Invitation::where('is_used', false)->count(),
            'pending_requests' => AccessRequest::where('status', 'pending')->count(),
        ];

        return Inertia::render('users/index', [
            'users' => $users,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for editing a user (admin only).
     */
    public function edit(User $user)
    {
        return Inertia::render('users/edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'role_display' => $user->getRoleDisplayName(),
            ],
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
            'role' => 'required|in:admin,user',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ]);

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

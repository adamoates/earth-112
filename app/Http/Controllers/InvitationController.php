<?php

namespace App\Http\Controllers;

use App\Mail\InvitationMail;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class InvitationController extends Controller
{
    public function index()
    {
        $invitations = Invitation::orderBy('created_at', 'desc')->get();

        return Inertia::render('Invitations/Index', [
            'invitations' => $invitations,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'name' => 'nullable|string|max:255',
            'role' => 'required|in:user,admin',
            'expires_at' => 'nullable|date|after:now',
        ]);

        $invitation = Invitation::create([
            'code' => strtoupper(Str::random(8)),
            'email' => $request->email,
            'name' => $request->name,
            'role' => $request->role,
            'expires_at' => $request->expires_at,
            'used' => false,
        ]);

        // Send invitation email
        try {
            Mail::to($request->email)->send(new InvitationMail($invitation));

            return redirect()->back()->with('success', 'Invitation sent successfully to ' . $request->email);
        } catch (\Exception $e) {
            // If email fails, still create the invitation but notify admin
            return redirect()->back()->with('warning', 'Invitation created but email failed to send. Code: ' . $invitation->code);
        }
    }

    public function destroy(Invitation $invitation)
    {
        $invitation->delete();

        return redirect()->back()->with('success', 'Invitation deleted successfully');
    }
}

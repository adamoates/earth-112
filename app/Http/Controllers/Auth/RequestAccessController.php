<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RequestAccessController extends Controller
{
    /**
     * Show the request access page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/request-access');
    }

    /**
     * Handle an incoming access request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'company' => 'required|string|max:255',
            'reason' => 'required|string|max:1000',
        ]);

        // Store the access request (you can create a model for this)
        // For now, we'll just send an email notification

        try {
            // Send email notification to administrators
            Mail::raw(
                "New Access Request\n\n" .
                    "Name: {$request->name}\n" .
                    "Email: {$request->email}\n" .
                    "Company: {$request->company}\n" .
                    "Reason: {$request->reason}\n\n" .
                    "Review this request and create an invitation if approved.",
                function ($message) use ($request) {
                    $message->to('admin@earth-112.com')
                        ->subject('New Access Request - ' . $request->name)
                        ->from('noreply@earth-112.com', 'Earth-112 System');
                }
            );

            return back()->with('status', 'Your access request has been submitted successfully. You will receive an email once it has been reviewed.');
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'email' => 'Failed to submit request. Please try again later.',
            ]);
        }
    }
}

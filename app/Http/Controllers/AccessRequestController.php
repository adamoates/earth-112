<?php

namespace App\Http\Controllers;

use App\Models\AccessRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccessRequestController extends Controller
{
    public function index(): Response
    {
        $accessRequests = AccessRequest::with('reviewer')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('access-requests/index', [
            'accessRequests' => $accessRequests,
        ]);
    }

    public function show(AccessRequest $accessRequest): Response
    {
        $accessRequest->load('reviewer');

        return Inertia::render('access-requests/show', [
            'accessRequest' => $accessRequest,
        ]);
    }

    public function approve(Request $request, AccessRequest $accessRequest)
    {
        $request->validate([
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $accessRequest->update([
            'status' => 'approved',
            'admin_notes' => $request->admin_notes,
            'reviewed_at' => now(),
            'reviewed_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Access request approved successfully.');
    }

    public function reject(Request $request, AccessRequest $accessRequest)
    {
        $request->validate([
            'admin_notes' => 'required|string|max:1000',
        ]);

        $accessRequest->update([
            'status' => 'rejected',
            'admin_notes' => $request->admin_notes,
            'reviewed_at' => now(),
            'reviewed_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Access request rejected.');
    }
}

<?php

namespace App\Http\Middleware;

use App\Services\AuthSettingsService;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CheckMaintenanceMode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if maintenance mode is enabled
        if (AuthSettingsService::isMaintenanceMode()) {
            // Allow owners to bypass maintenance mode
            if ($request->user() && $request->user()->hasRole('owner')) {
                return $next($request);
            }

            // Show maintenance page for all other users
            return Inertia::render('maintenance', [
                'message' => AuthSettingsService::getMaintenanceMessage(),
            ])->toResponse($request);
        }

        return $next($request);
    }
}

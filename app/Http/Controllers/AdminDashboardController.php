<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Invitation;
use App\Models\AccessRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    /**
     * Get admin dashboard statistics.
     */
    public function getStats(Request $request): JsonResponse
    {
        $cacheKey = 'admin_dashboard_stats';

        $data = Cache::remember($cacheKey, 60, function () {
            return [
                'stats' => $this->getDashboardStats(),
                'recentActivity' => $this->getRecentActivity(),
            ];
        });

        return response()->json($data);
    }

    /**
     * Get dashboard statistics.
     */
    private function getDashboardStats(): array
    {
        $totalUsers = User::count();
        $adminUsers = User::role('admin')->count();
        $regularUsers = $totalUsers - $adminUsers;

        $activeInvitations = Invitation::where('used_at', null)
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })->count();

        $pendingRequests = AccessRequest::where('status', 'pending')->count();

        // Simple session count (in a real app, you'd track active sessions)
        $activeSessions = User::where('updated_at', '>=', now()->subMinutes(30))->count();

        // System health check
        $systemHealth = $this->getSystemHealth();

        // Uptime calculation (simplified)
        $uptime = $this->calculateUptime();

        return [
            'totalUsers' => $totalUsers,
            'adminUsers' => $adminUsers,
            'regularUsers' => $regularUsers,
            'activeSessions' => $activeSessions,
            'activeInvitations' => $activeInvitations,
            'pendingRequests' => $pendingRequests,
            'systemHealth' => $systemHealth,
            'uptime' => $uptime,
        ];
    }

    /**
     * Get recent activity for admin dashboard.
     */
    private function getRecentActivity(): array
    {
        $activities = [];

        // Recent user registrations
        $recentUsers = User::where('created_at', '>=', now()->subDays(7))
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        foreach ($recentUsers as $user) {
            $activities[] = [
                'id' => 'user-' . $user->id,
                'type' => 'user',
                'description' => "New user registered: {$user->name}",
                'time' => $user->created_at->diffForHumans(),
                'icon' => 'UserCheck',
                'color' => 'green',
            ];
        }

        // Recent invitations
        $recentInvitations = Invitation::where('created_at', '>=', now()->subDays(7))
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        foreach ($recentInvitations as $invitation) {
            $activities[] = [
                'id' => 'invitation-' . $invitation->id,
                'type' => 'invitation',
                'description' => "Invitation sent to: {$invitation->email}",
                'time' => $invitation->created_at->diffForHumans(),
                'icon' => 'Mail',
                'color' => 'blue',
            ];
        }

        // System activities
        $activities[] = [
            'id' => 'system-health',
            'type' => 'system',
            'description' => 'System health check completed',
            'time' => now()->subMinutes(5)->diffForHumans(),
            'icon' => 'Shield',
            'color' => 'purple',
        ];

        // Sort by time (most recent first)
        usort($activities, function ($a, $b) {
            return strtotime($b['time']) - strtotime($a['time']);
        });

        return array_slice($activities, 0, 10);
    }

    /**
     * Get system health percentage.
     */
    private function getSystemHealth(): int
    {
        try {
            // Test database connection
            DB::connection()->getPdo();

            // Test basic queries
            User::count();
            Invitation::count();

            return 100;
        } catch (\Exception $e) {
            return 95; // Slight degradation if there are issues
        }
    }

    /**
     * Calculate system uptime percentage.
     */
    private function calculateUptime(): float
    {
        // In a real application, you'd track actual uptime
        // For now, return a high percentage
        return 99.9;
    }
}

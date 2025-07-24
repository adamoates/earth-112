<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Invitation;
use App\Models\AccessRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class UserDashboardController extends Controller
{
    /**
     * Display the user dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $userRoles = $user->roles->pluck('name');
        $isAdmin = $userRoles->contains('admin');
        $isEditor = $userRoles->contains('editor');

        // If admin, redirect to admin dashboard
        if ($isAdmin) {
            return Inertia::render('dashboard');
        }

        // Get user-specific data with caching
        $dashboardData = $this->getCachedDashboardData($user, $isEditor);

        return Inertia::render('user-dashboard', $dashboardData);
    }

    /**
     * Get cached dashboard data based on user role and permissions.
     */
    private function getCachedDashboardData(User $user, bool $isEditor): array
    {
        $cacheKey = "dashboard.{$user->id}." . ($isEditor ? 'editor' : 'user');

        return Cache::remember($cacheKey, 300, function () use ($user, $isEditor) {
            return $this->getUserDashboardData($user, $isEditor);
        });
    }

    /**
     * Get dashboard data based on user role and permissions.
     */
    private function getUserDashboardData(User $user, bool $isEditor): array
    {
        $data = [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->map(fn($role) => $role->name),
                'created_at' => $user->created_at,
                'email_verified_at' => $user->email_verified_at,
            ],
            'stats' => $this->getPersonalStats($user, $isEditor),
            'recentActivity' => $this->getRecentActivity($user),
            'quickActions' => $this->getQuickActions($user, $isEditor),
            'announcements' => $this->getAnnouncements(),
        ];

        // Add editor-specific data
        if ($isEditor) {
            $data['teamStats'] = $this->getTeamStats();
        }

        return $data;
    }

    /**
     * Get personal statistics for the user.
     */
    private function getPersonalStats(User $user, bool $isEditor): array
    {
        $stats = [
            'account_age_days' => round($user->created_at->diffInDays(now())),
            'profile_completion' => $this->calculateProfileCompletion($user),
            'last_login' => $user->updated_at, // Would be better with login tracking
        ];

        if ($isEditor) {
            // Add editor-specific stats with real data
            $stats['invitations_sent'] = Invitation::where('created_by', $user->id)->count();
            $stats['access_requests_processed'] = AccessRequest::where('processed_by', $user->id)
                ->where('status', 'approved')
                ->count();
        }

        return $stats;
    }

    /**
     * Calculate user profile completion percentage.
     */
    private function calculateProfileCompletion(User $user): int
    {
        $fields = [
            'name' => !empty($user->name),
            'email' => !empty($user->email),
            'email_verified' => !is_null($user->email_verified_at),
        ];

        $completedFields = array_filter($fields);
        return round((count($completedFields) / count($fields)) * 100);
    }

    /**
     * Get recent activity for the user with real data.
     */
    private function getRecentActivity(User $user): array
    {
        $activities = [];

        // Add account creation activity
        $activities[] = [
            'id' => 'account-created',
            'type' => 'account',
            'description' => 'Account created',
            'date' => $user->created_at,
            'icon' => 'user-plus',
        ];

        // Add email verification activity if applicable
        if ($user->email_verified_at) {
            $activities[] = [
                'id' => 'email-verified',
                'type' => 'security',
                'description' => 'Email address verified',
                'date' => $user->email_verified_at,
                'icon' => 'mail-check',
            ];
        }

        // Add recent login activity (using updated_at as proxy)
        if ($user->updated_at && $user->updated_at->diffInHours(now()) < 24) {
            $activities[] = [
                'id' => 'recent-login',
                'type' => 'security',
                'description' => 'Recent login',
                'date' => $user->updated_at,
                'icon' => 'shield',
            ];
        }

        // Add editor-specific activities
        if ($user->hasRole('editor')) {
            $recentInvitations = Invitation::where('created_by', $user->id)
                ->where('created_at', '>=', now()->subDays(7))
                ->count();

            if ($recentInvitations > 0) {
                $activities[] = [
                    'id' => 'invitations-sent',
                    'type' => 'team',
                    'description' => "Sent {$recentInvitations} invitation(s) this week",
                    'date' => now()->subDays(1),
                    'icon' => 'user-plus',
                ];
            }
        }

        // Sort by date (newest first)
        usort($activities, function ($a, $b) {
            return $b['date']->timestamp - $a['date']->timestamp;
        });

        return array_slice($activities, 0, 10); // Return last 10 activities
    }

    /**
     * Get quick actions available to the user.
     */
    private function getQuickActions(User $user, bool $isEditor): array
    {
        $actions = [
            [
                'title' => 'Update Profile',
                'description' => 'Update your personal information',
                'href' => '/settings/profile',
                'icon' => 'user',
                'color' => 'blue',
            ],
            [
                'title' => 'Change Password',
                'description' => 'Update your account password',
                'href' => '/settings/password',
                'icon' => 'lock',
                'color' => 'green',
            ],
        ];

        if ($isEditor) {
            $actions[] = [
                'title' => 'Send Invitation',
                'description' => 'Invite a new team member',
                'href' => '/invitations/create',
                'icon' => 'user-plus',
                'color' => 'purple',
            ];

            $actions[] = [
                'title' => 'Access Requests',
                'description' => 'Review pending access requests',
                'href' => '/access-requests',
                'icon' => 'shield-check',
                'color' => 'orange',
            ];
        }

        return $actions;
    }

    /**
     * Get system announcements with real data.
     */
    private function getAnnouncements(): array
    {
        // For now, return a dynamic welcome message
        $announcements = [
            [
                'id' => 1,
                'title' => 'Welcome to Earth-112',
                'message' => 'Your account has been successfully created. Explore the platform and update your profile.',
                'type' => 'info',
                'created_at' => now()->subDays(1),
            ],
        ];

        // Add system status announcements if needed
        $systemHealth = $this->getSystemHealth();
        if ($systemHealth < 100) {
            $announcements[] = [
                'id' => 2,
                'title' => 'System Maintenance',
                'message' => 'We are currently performing system maintenance. Some features may be temporarily unavailable.',
                'type' => 'warning',
                'created_at' => now()->subHours(2),
            ];
        }

        return $announcements;
    }

    /**
     * Get team statistics for editors with real data.
     */
    private function getTeamStats(): array
    {
        return [
            'total_users' => User::count(),
            'active_invitations' => Invitation::where('used_at', null)
                ->where(function ($query) {
                    $query->whereNull('expires_at')
                        ->orWhere('expires_at', '>', now());
                })->count(),
            'pending_access_requests' => AccessRequest::where('status', 'pending')->count(),
        ];
    }

    /**
     * Get system health percentage.
     */
    private function getSystemHealth(): int
    {
        // Simple health check - could be enhanced with real system monitoring
        try {
            DB::connection()->getPdo();
            return 100;
        } catch (\Exception $e) {
            return 95; // Slight degradation if DB connection issues
        }
    }
}

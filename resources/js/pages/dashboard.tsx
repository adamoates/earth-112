import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Activity, Clock, Mail, Shield, TrendingUp, UserCheck, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Overview',
        href: '/dashboard',
    },
];

interface DashboardStats {
    totalUsers: number;
    activeSessions: number;
    systemHealth: number;
    uptime: number;
    adminUsers: number;
    regularUsers: number;
    activeInvitations: number;
    pendingRequests: number;
}

interface RecentActivity {
    id: string;
    type: string;
    description: string;
    time: string;
    icon: string;
    color: string;
}

export default function Dashboard() {
    const { auth } = usePage().props as unknown as { auth: { user?: { name?: string; email?: string; roles?: Array<{ name: string }> } } };
    const userRoles = auth.user?.roles?.map((role) => role.name) || [];
    const isAdmin = userRoles.includes('admin');

    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        activeSessions: 0,
        systemHealth: 100,
        uptime: 99.9,
        adminUsers: 0,
        regularUsers: 0,
        activeInvitations: 0,
        pendingRequests: 0,
    });

    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch dashboard data
        fetchDashboardData();

        // Set up real-time updates every 30 seconds
        const interval = setInterval(fetchDashboardData, 30000);

        return () => clearInterval(interval);
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('/api/admin/dashboard-stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data.stats);
                setRecentActivity(data.recentActivity);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Access Denied" />
                <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 p-8">
                    <Shield className="h-16 w-16 text-red-500" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h1>
                    <p className="text-gray-600 dark:text-gray-400">You don't have permission to view this page.</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Welcome Section */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">System overview and management controls</p>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{loading ? '...' : stats.totalUsers}</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">{stats.adminUsers} admins</span>, {stats.regularUsers} regular
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{loading ? '...' : stats.activeSessions}</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">Currently online</span>
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">System Health</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{loading ? '...' : stats.systemHealth}%</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">All systems operational</span>
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{loading ? '...' : stats.uptime}%</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">Last 30 days</span>
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Admin Overview */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserCheck className="h-5 w-5" />
                                User Management
                            </CardTitle>
                            <CardDescription>Quick access to user management and invitation creation</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{loading ? '...' : stats.totalUsers}</div>
                                    <div className="text-sm text-muted-foreground">Total Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{loading ? '...' : stats.activeInvitations}</div>
                                    <div className="text-sm text-muted-foreground">Active Invitations</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <a href="/users" className="flex-1">
                                    <div className="rounded-lg border p-3 text-center hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <Users className="mx-auto mb-1 h-4 w-4" />
                                        <div className="text-sm font-medium">Manage Users</div>
                                    </div>
                                </a>
                                <a href="/invitations" className="flex-1">
                                    <div className="rounded-lg border p-3 text-center hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <Mail className="mx-auto mb-1 h-4 w-4" />
                                        <div className="text-sm font-medium">Invitations</div>
                                    </div>
                                </a>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Recent Activity
                            </CardTitle>
                            <CardDescription>Latest system activity and user registrations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                                                <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentActivity.length === 0 ? (
                                        <div className="py-4 text-center text-muted-foreground">
                                            <Activity className="mx-auto mb-2 h-8 w-8" />
                                            <p className="text-sm">No recent activity</p>
                                        </div>
                                    ) : (
                                        recentActivity.slice(0, 5).map((activity) => (
                                            <div key={activity.id} className="flex items-center gap-3">
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-${activity.color}-100 dark:bg-${activity.color}-900/20`}
                                                >
                                                    {activity.icon === 'UserCheck' && (
                                                        <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                    )}
                                                    {activity.icon === 'Mail' && <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                                                    {activity.icon === 'Shield' && (
                                                        <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">{activity.description}</p>
                                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* System Status */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            System Status
                        </CardTitle>
                        <CardDescription>Current system performance and health metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{loading ? '...' : stats.systemHealth}%</div>
                                <div className="text-sm text-muted-foreground">System Health</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">0ms</div>
                                <div className="text-sm text-muted-foreground">Response Time</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{loading ? '...' : stats.uptime}%</div>
                                <div className="text-sm text-muted-foreground">Uptime</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Placeholder Content */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}

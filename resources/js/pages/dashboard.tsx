import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Activity, BarChart3, Settings, Shield, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const isAdmin = auth.user?.role === 'admin';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Welcome Section */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to earth-112</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your application and monitor activity
                        {isAdmin && ' - Administrator Access'}
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {isAdmin && (
                        <a href="/users">
                            <Card className="cursor-pointer transition-shadow hover:shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">User Management</CardTitle>
                                    <Settings className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Manage</div>
                                    <p className="text-xs text-muted-foreground">View and manage users</p>
                                </CardContent>
                            </Card>
                        </a>
                    )}

                    <a href="/users">
                        <Card className="cursor-pointer transition-shadow hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Users</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">View</div>
                                <p className="text-xs text-muted-foreground">User information</p>
                            </CardContent>
                        </Card>
                    </a>

                    <a href="/security">
                        <Card className="cursor-pointer transition-shadow hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Security</CardTitle>
                                <Shield className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Monitor</div>
                                <p className="text-xs text-muted-foreground">Security and access logs</p>
                            </CardContent>
                        </Card>
                    </a>

                    <a href="/analytics">
                        <Card className="cursor-pointer transition-shadow hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Analytics</CardTitle>
                                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">View</div>
                                <p className="text-xs text-muted-foreground">Application analytics</p>
                            </CardContent>
                        </Card>
                    </a>
                </div>

                {/* Application Overview */}
                <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                            <Activity className="h-5 w-5" />
                            Application Overview
                        </CardTitle>
                        <CardDescription className="text-blue-700 dark:text-blue-300">
                            Monitor your application's performance, user activity, and system health.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">1</div>
                                <div className="text-sm text-blue-700 dark:text-blue-300">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">0</div>
                                <div className="text-sm text-blue-700 dark:text-blue-300">Sessions Today</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">100%</div>
                                <div className="text-sm text-blue-700 dark:text-blue-300">System Health</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* User Role Information */}
                {!isAdmin && (
                    <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
                                <Users className="h-5 w-5" />
                                Your Account
                            </CardTitle>
                            <CardDescription className="text-green-700 dark:text-green-300">
                                You are logged in as a regular user. Contact an administrator for elevated privileges.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-green-900 dark:text-green-100">Role:</span>
                                <span className="text-sm text-green-700 dark:text-green-300">{auth.user?.role === 'user' ? 'User' : 'Unknown'}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}

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

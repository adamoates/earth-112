import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Activity, Clock, Mail, Shield, TrendingUp, UserCheck, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Overview',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const isAdmin = auth.user?.role === 'admin';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Overview" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Welcome Section */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to Earth-112</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Your application overview and system status
                        {isAdmin && ' - Administrator Access'}
                    </p>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">+100%</span> from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">+1</span> from last hour
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">System Health</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">100%</div>
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
                            <div className="text-2xl font-bold">99.9%</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">Last 30 days</span>
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Admin Overview */}
                {isAdmin && (
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
                                        <div className="text-2xl font-bold">2</div>
                                        <div className="text-sm text-muted-foreground">Total Users</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">5</div>
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
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                                            <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">User registered</p>
                                            <p className="text-xs text-muted-foreground">2 minutes ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                                            <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Invitation created</p>
                                            <p className="text-xs text-muted-foreground">1 hour ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                                            <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Security scan completed</p>
                                            <p className="text-xs text-muted-foreground">3 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* User Overview */}
                {!isAdmin && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserCheck className="h-5 w-5" />
                                Your Account
                            </CardTitle>
                            <CardDescription>Your account information and access level</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{auth.user?.name}</div>
                                    <div className="text-sm text-muted-foreground">Name</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{auth.user?.email}</div>
                                    <div className="text-sm text-muted-foreground">Email</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{auth.user?.role === 'user' ? 'User' : 'Unknown'}</div>
                                    <div className="text-sm text-muted-foreground">Role</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

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
                                <div className="text-2xl font-bold text-green-600">100%</div>
                                <div className="text-sm text-muted-foreground">System Health</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">0ms</div>
                                <div className="text-sm text-muted-foreground">Response Time</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">99.9%</div>
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

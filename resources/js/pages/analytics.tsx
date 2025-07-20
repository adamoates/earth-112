import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Activity, Clock, Eye, TrendingUp, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Analytics',
        href: '/analytics',
    },
];

export default function Analytics() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Monitor application performance and user activity</p>
                </div>

                {/* Analytics Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2</div>
                            <p className="text-xs text-muted-foreground">Registered accounts</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1</div>
                            <p className="text-xs text-muted-foreground">Current users</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground">Today</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12m</div>
                            <p className="text-xs text-muted-foreground">Duration</p>
                        </CardContent>
                    </Card>
                </div>

                {/* User Activity Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Activity</CardTitle>
                        <CardDescription>Daily user activity over the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Today</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-32 rounded-full bg-gray-200">
                                        <div className="h-2 w-8 rounded-full bg-blue-500"></div>
                                    </div>
                                    <span className="text-sm text-gray-500">2</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Yesterday</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-32 rounded-full bg-gray-200">
                                        <div className="h-2 w-4 rounded-full bg-blue-500"></div>
                                    </div>
                                    <span className="text-sm text-gray-500">1</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">2 days ago</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-32 rounded-full bg-gray-200">
                                        <div className="h-2 w-6 rounded-full bg-blue-500"></div>
                                    </div>
                                    <span className="text-sm text-gray-500">1</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest user actions and system events</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    <div>
                                        <p className="font-medium">User login</p>
                                        <p className="text-sm text-gray-500">apmo1984@gmail.com</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">2 minutes ago</p>
                                    <Badge variant="secondary">Login</Badge>
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                    <div>
                                        <p className="font-medium">Dashboard access</p>
                                        <p className="text-sm text-gray-500">Main dashboard viewed</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">5 minutes ago</p>
                                    <Badge variant="secondary">View</Badge>
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                    <div>
                                        <p className="font-medium">User management</p>
                                        <p className="text-sm text-gray-500">Users page accessed</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">10 minutes ago</p>
                                    <Badge variant="secondary">Admin</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                            <TrendingUp className="h-5 w-5" />
                            Performance Metrics
                        </CardTitle>
                        <CardDescription className="text-blue-700 dark:text-blue-300">System performance and response times.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">45ms</div>
                                <div className="text-sm text-blue-700 dark:text-blue-300">Avg Response Time</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">99.9%</div>
                                <div className="text-sm text-blue-700 dark:text-blue-300">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">1.2MB</div>
                                <div className="text-sm text-blue-700 dark:text-blue-300">Avg Page Size</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Activity, AlertTriangle, Lock, Shield } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Security',
        href: '/security',
    },
];

export default function Security() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Security" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Monitor security events and access logs</p>
                </div>

                {/* Security Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">Last 24 hours</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">95%</div>
                            <p className="text-xs text-muted-foreground">System health</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Protected Routes</CardTitle>
                            <Lock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">Active protections</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Security Events</CardTitle>
                        <CardDescription>Latest security-related activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    <div>
                                        <p className="font-medium">Successful login</p>
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
                                        <p className="font-medium">Session created</p>
                                        <p className="text-sm text-gray-500">Dashboard access</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">5 minutes ago</p>
                                    <Badge variant="secondary">Session</Badge>
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                    <div>
                                        <p className="font-medium">Role verification</p>
                                        <p className="text-sm text-gray-500">Admin access granted</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">10 minutes ago</p>
                                    <Badge variant="secondary">Auth</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Status */}
                <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
                            <Shield className="h-5 w-5" />
                            System Security Status
                        </CardTitle>
                        <CardDescription className="text-green-700 dark:text-green-300">All security systems are operating normally.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-900 dark:text-green-100">✓</div>
                                <div className="text-sm text-green-700 dark:text-green-300">Authentication</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-900 dark:text-green-100">✓</div>
                                <div className="text-sm text-green-700 dark:text-green-300">Authorization</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-900 dark:text-green-100">✓</div>
                                <div className="text-sm text-green-700 dark:text-green-300">Session Management</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

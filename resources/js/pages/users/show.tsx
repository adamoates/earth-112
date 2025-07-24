import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowLeft, Calendar, Mail, Shield, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'User Details',
        href: '#',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    role_display: string;
    created_at: string;
    email_verified_at: string | null;
}

interface Props {
    user: User;
}

export default function ShowUser({ user }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User Details - ${user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="/users">
                            <ArrowLeft className="h-4 w-4" />
                        </a>
                    </Button>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Details</h1>
                        <p className="text-gray-600 dark:text-gray-400">View user information and account details</p>
                    </div>
                </div>

                {/* User Information */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Basic Information
                            </CardTitle>
                            <CardDescription>User account details and profile information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <span className="text-sm font-semibold">{user.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>

                            <div className="grid gap-4 pt-4">
                                <div className="flex items-center gap-3">
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Role</p>
                                        <p className="text-sm text-muted-foreground">{user.role_display}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Member Since</p>
                                        <p className="text-sm text-muted-foreground">{user.created_at}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Email Status</p>
                                        <p className="text-sm text-muted-foreground">{user.email_verified_at ? 'Verified' : 'Not Verified'}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Status</CardTitle>
                            <CardDescription>Current account status and verification</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Account Status</span>
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                                    Active
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Email Verification</span>
                                <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                        user.email_verified_at
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    }`}
                                >
                                    {user.email_verified_at ? 'Verified' : 'Pending'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Role Permissions</span>
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    {user.role_display}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Actions</CardTitle>
                        <CardDescription>Manage this user account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            <Button asChild>
                                <a href={`/users/${user.id}/edit`}>Edit User</a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href="/users">Back to Users</a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

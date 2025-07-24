import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Clock, Edit, Mail, Plus, Search, Shield, UserPlus, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'User Management',
        href: '/users',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    role_display: string;
    created_at: string;
}

interface Invitation {
    id: number;
    email: string;
    role: string;
    expires_at?: string;
    used_at?: string;
    created_at: string;
    creator?: {
        name: string;
    };
}

interface Props {
    users: User[];
    invitations?: Invitation[];
    stats?: {
        total_users: number;
        admin_users: number;
        regular_users: number;
        active_invitations: number;
        pending_requests: number;
    };
}

export default function UsersIndex({ users, invitations = [], stats }: Props) {
    const adminCount = users.filter((user) => user.role === 'admin').length;
    const userCount = users.filter((user) => user.role === 'user').length;

    const getInvitationStatusBadge = (invitation: Invitation) => {
        if (invitation.used_at) {
            return (
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Used
                </Badge>
            );
        }

        if (invitation.expires_at && new Date(invitation.expires_at) < new Date()) {
            return <Badge variant="destructive">Expired</Badge>;
        }

        return (
            <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Active
            </Badge>
        );
    };

    const getRoleDisplayName = (role: string) => {
        return (
            {
                admin: 'Administrator',
                editor: 'Editor',
                viewer: 'Viewer',
            }[role] || role
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 sm:gap-6">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="space-y-2">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">User Management</h1>
                        <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">Manage users, invitations, and access requests</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild>
                            <Link href="/invitations/create">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Send Invitation
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Enhanced Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold sm:text-2xl">{users.length}</div>
                            <p className="text-xs text-muted-foreground">All users</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold sm:text-2xl">{adminCount}</div>
                            <p className="text-xs text-muted-foreground">Admin users</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold sm:text-2xl">{userCount}</div>
                            <p className="text-xs text-muted-foreground">Standard users</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Invitations</CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold sm:text-2xl">
                                {invitations.filter((i) => !i.used_at && (!i.expires_at || new Date(i.expires_at) > new Date())).length}
                            </div>
                            <p className="text-xs text-muted-foreground">Available invitations</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold sm:text-2xl">{stats?.pending_requests || 0}</div>
                            <p className="text-xs text-muted-foreground">Awaiting review</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Common user management tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-medium">Review Access Requests</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Approve or reject pending requests</p>
                                </div>
                                <Button asChild size="sm" className="flex-shrink-0">
                                    <Link href="/access-requests">Review</Link>
                                </Button>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                                    <UserPlus className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-medium">Send Invitation</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Invite new users to the platform</p>
                                </div>
                                <Button asChild size="sm" className="flex-shrink-0">
                                    <Link href="/invitations/create">Invite</Link>
                                </Button>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 sm:col-span-2 lg:col-span-1 dark:hover:bg-gray-800">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-medium">Create User</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Manually create a new user account</p>
                                </div>
                                <Button asChild size="sm" className="flex-shrink-0">
                                    <Link href="/admin/create">Create</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Invitations */}
                {invitations.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                                Recent Invitations
                            </CardTitle>
                            <CardDescription>Track the status of sent invitations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {invitations.slice(0, 5).map((invitation) => (
                                    <div
                                        key={invitation.id}
                                        className="flex flex-col items-start justify-between gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
                                    >
                                        <div className="flex min-w-0 flex-1 items-center gap-4">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium text-gray-900 dark:text-white">{invitation.email}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Role: {getRoleDisplayName(invitation.role)} • Created:{' '}
                                                    {new Date(invitation.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center gap-2 sm:w-auto">
                                            {getInvitationStatusBadge(invitation)}
                                            <Button variant="ghost" size="sm" asChild className="flex-1 sm:flex-none">
                                                <Link href={`/invitations/${invitation.id}`}>View Details</Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {invitations.length > 5 && (
                                    <div className="pt-4 text-center">
                                        <Button variant="outline" asChild>
                                            <Link href="/invitations">View All Invitations</Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Users List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                            Users
                        </CardTitle>
                        <CardDescription>Manage user accounts and permissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                            <div className="flex w-full items-center gap-2 sm:w-auto">
                                <Search className="h-4 w-4 text-gray-400" />
                                <Input placeholder="Search users..." className="w-full sm:w-64" />
                            </div>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Users</SelectItem>
                                    <SelectItem value="admin">Administrators</SelectItem>
                                    <SelectItem value="editor">Editors</SelectItem>
                                    <SelectItem value="viewer">Viewers</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex flex-col items-start justify-between gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
                                >
                                    <div className="flex min-w-0 flex-1 items-center gap-4">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                            <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-medium text-gray-900 dark:text-white">{user.name}</p>
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center gap-2 sm:w-auto">
                                        <Badge variant="outline" className="flex-shrink-0">
                                            {user.role_display}
                                        </Badge>
                                        <Button variant="ghost" size="sm" asChild className="flex-1 sm:flex-none">
                                            <Link href={`/users/${user.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

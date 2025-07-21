import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Clock, Edit, Mail, Plus, Search, Shield, Trash2, UserPlus, Users } from 'lucide-react';

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

interface Props {
    users: User[];
    stats?: {
        total_users: number;
        admin_users: number;
        regular_users: number;
        active_invitations: number;
        pending_requests: number;
    };
}

export default function UsersIndex({ users, stats }: Props) {
    const adminCount = users.filter((user) => user.role === 'admin').length;
    const userCount = users.filter((user) => user.role === 'user').length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage users, invitations, and access requests</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild variant="outline">
                            <Link href="/access-requests">
                                <Clock className="mr-2 h-4 w-4" />
                                Review Requests
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/invitations/create">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Create Invitation
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Enhanced Stats */}
                <div className="grid gap-4 md:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{users.length}</div>
                            <p className="text-xs text-muted-foreground">All users</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{adminCount}</div>
                            <p className="text-xs text-muted-foreground">Admin users</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{userCount}</div>
                            <p className="text-xs text-muted-foreground">Standard users</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Invitations</CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.active_invitations || 0}</div>
                            <p className="text-xs text-muted-foreground">Available codes</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.pending_requests || 0}</div>
                            <p className="text-xs text-muted-foreground">Awaiting review</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Common user management tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">Review Access Requests</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Approve or reject pending requests</p>
                                </div>
                                <Button asChild size="sm">
                                    <Link href="/access-requests">Review</Link>
                                </Button>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                                    <UserPlus className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">Create Invitation</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Send invitation to new user</p>
                                </div>
                                <Button asChild size="sm">
                                    <Link href="/invitations/create">Create</Link>
                                </Button>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                                    <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">Manage Invitations</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">View and manage all invitations</p>
                                </div>
                                <Button asChild size="sm">
                                    <Link href="/invitations">Manage</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Search and Filter */}
                <Card>
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>Search and manage user accounts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex items-center gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input placeholder="Search users..." className="pl-10" />
                                </div>
                            </div>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Users</SelectItem>
                                    <SelectItem value="admin">Administrators</SelectItem>
                                    <SelectItem value="user">Regular Users</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Users List */}
                        <div className="grid gap-4">
                            {users.map((user) => (
                                <Card key={user.id} className="transition-shadow hover:shadow-md">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <CardTitle className="flex items-center gap-2 text-lg">
                                                        {user.name}
                                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role_display}</Badge>
                                                    </CardTitle>
                                                    <CardDescription className="text-sm">{user.email}</CardDescription>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-right">
                                                    <div className="text-xs text-gray-500">Member since</div>
                                                    <div className="text-sm font-medium">{new Date(user.created_at).toLocaleDateString()}</div>
                                                </div>
                                                <div className="flex gap-1">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/users/${user.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" disabled={user.role === 'admin'}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>

                        {users.length === 0 && (
                            <Card className="border-dashed">
                                <CardContent className="flex flex-col items-center justify-center py-8">
                                    <Users className="mb-4 h-12 w-12 text-gray-400" />
                                    <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No users found</h3>
                                    <p className="text-center text-gray-600 dark:text-gray-400">
                                        Create your first invitation to add users to the system.
                                    </p>
                                    <div className="mt-4 flex gap-2">
                                        <Button asChild>
                                            <Link href="/invitations/create">
                                                <UserPlus className="mr-2 h-4 w-4" />
                                                Create Invitation
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline">
                                            <Link href="/access-requests">
                                                <Clock className="mr-2 h-4 w-4" />
                                                Review Requests
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

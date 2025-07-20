import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Mail, Shield, Trash2, UserPlus, Users } from 'lucide-react';

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
}

export default function UsersIndex({ users }: Props) {
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
                        <p className="text-gray-600 dark:text-gray-400">Manage user accounts, roles, and access</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild>
                            <Link href="/invitations/create">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Create Invitation
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
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
                            <CardTitle className="text-sm font-medium">Invitations</CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">-</div>
                            <p className="text-xs text-muted-foreground">Active codes</p>
                        </CardContent>
                    </Card>
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
                                            <Button variant="ghost" size="icon">
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
                            <p className="text-center text-gray-600 dark:text-gray-400">Create your first invitation to add users to the system.</p>
                            <Button asChild className="mt-4">
                                <Link href="/invitations/create">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Create Invitation
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

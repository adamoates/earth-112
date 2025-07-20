import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Trash2, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users',
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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage user accounts and roles</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">{users.length} users</span>
                    </div>
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
                                            <CardTitle className="text-lg">{user.name}</CardTitle>
                                            <CardDescription className="text-sm">{user.email}</CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role_display}</Badge>
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
                            <CardContent className="pt-0">
                                <div className="text-xs text-gray-500">Created: {new Date(user.created_at).toLocaleDateString()}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {users.length === 0 && (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <Users className="mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No users found</h3>
                            <p className="text-center text-gray-600 dark:text-gray-400">There are no users in the system yet.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

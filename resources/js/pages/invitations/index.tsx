import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Clock, Mail, Plus, XCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Invitations',
        href: '#',
    },
];

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
    invitations: {
        data: Invitation[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function InvitationsIndex({ invitations }: Props) {
    const getStatusBadge = (invitation: Invitation) => {
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
            <Head title="Invitations" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invitations</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage user invitations and track their status</p>
                    </div>
                    <Button asChild>
                        <Link href="/invitations/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Send Invitation
                        </Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-blue-600" />
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invitations</p>
                                    <p className="text-2xl font-bold">{invitations.total}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Used</p>
                                    <p className="text-2xl font-bold">{invitations.data.filter((i) => i.used_at).length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-600" />
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                                    <p className="text-2xl font-bold">
                                        {invitations.data.filter((i) => !i.used_at && (!i.expires_at || new Date(i.expires_at) > new Date())).length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <XCircle className="h-4 w-4 text-red-600" />
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expired</p>
                                    <p className="text-2xl font-bold">
                                        {invitations.data.filter((i) => i.expires_at && new Date(i.expires_at) < new Date() && !i.used_at).length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Invitations List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Invitations</CardTitle>
                        <CardDescription>Track the status of all sent invitations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {invitations.data.length === 0 ? (
                                <div className="py-8 text-center">
                                    <Mail className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No invitations</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by sending your first invitation.</p>
                                    <div className="mt-6">
                                        <Button asChild>
                                            <Link href="/invitations/create">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Send Invitation
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {invitations.data.map((invitation) => (
                                        <div key={invitation.id} className="flex items-center justify-between rounded-lg border p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{invitation.email}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Role: {getRoleDisplayName(invitation.role)} • Created:{' '}
                                                        {new Date(invitation.created_at).toLocaleDateString()}
                                                        {invitation.creator && ` • By: ${invitation.creator.name}`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(invitation)}
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/invitations/${invitation.id}`}>View Details</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

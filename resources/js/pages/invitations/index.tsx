import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Copy, Mail, Plus, Trash2, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Invitations',
        href: '/invitations',
    },
];

interface Invitation {
    id: number;
    code: string;
    email: string | null;
    name: string | null;
    role: string;
    role_display: string;
    is_used: boolean;
    expires_at: string | null;
    created_at: string;
    used_at: string | null;
    creator_name: string | null;
    used_by_name: string | null;
    is_valid: boolean;
}

interface Props {
    invitations: Invitation[];
}

export default function InvitationsIndex({ invitations }: Props) {
    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invitations" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invitations</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage user invitations and access codes</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild>
                            <Link href="/invitations/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Invitation
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Invitations</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{invitations.length}</div>
                            <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Invitations</CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{invitations.filter((inv) => inv.is_valid && !inv.is_used).length}</div>
                            <p className="text-xs text-muted-foreground">Available</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Used Invitations</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{invitations.filter((inv) => inv.is_used).length}</div>
                            <p className="text-xs text-muted-foreground">Redeemed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Invitations List */}
                <div className="grid gap-4">
                    {invitations.map((invitation) => (
                        <Card key={invitation.id} className="transition-shadow hover:shadow-md">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                                            <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                {invitation.code}
                                                <Badge variant={invitation.is_used ? 'secondary' : 'default'}>
                                                    {invitation.is_used ? 'Used' : 'Active'}
                                                </Badge>
                                            </CardTitle>
                                            <CardDescription className="text-sm">
                                                {invitation.email || 'No email specified'} • {invitation.role_display}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!invitation.is_used && invitation.is_valid && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => copyToClipboard(invitation.code)}
                                                title="Copy invitation code"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {!invitation.is_used && (
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/invitations/${invitation.id}/edit`}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">Created:</span>
                                        <p className="text-gray-500">{new Date(invitation.created_at).toLocaleDateString()}</p>
                                    </div>
                                    {invitation.expires_at && (
                                        <div>
                                            <span className="font-medium">Expires:</span>
                                            <p className="text-gray-500">{new Date(invitation.expires_at).toLocaleDateString()}</p>
                                        </div>
                                    )}
                                    {invitation.is_used && invitation.used_at && (
                                        <div>
                                            <span className="font-medium">Used:</span>
                                            <p className="text-gray-500">{new Date(invitation.used_at).toLocaleDateString()}</p>
                                        </div>
                                    )}
                                    {invitation.used_by_name && (
                                        <div>
                                            <span className="font-medium">Used by:</span>
                                            <p className="text-gray-500">{invitation.used_by_name}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {invitations.length === 0 && (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <Mail className="mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No invitations found</h3>
                            <p className="text-center text-gray-600 dark:text-gray-400">Create your first invitation to start inviting users.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

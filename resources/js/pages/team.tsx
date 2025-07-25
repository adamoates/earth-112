import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatRelativeTime } from '@/utils/date';
import { Head, Link } from '@inertiajs/react';
import { Mail, Plus, UserPlus, Users } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    roles: Array<{ name: string }>;
    created_at: string;
    email_verified_at: string | null;
}

interface Invitation {
    id: number;
    email: string;
    role: string;
    expires_at: string | null;
    used_at: string | null;
    created_at: string;
}

interface Props {
    users: User[];
    invitations: Invitation[];
    stats: {
        total_users: number;
        active_invitations: number;
        recent_registrations: number;
    };
}

export default function TeamPage({ users = [], invitations = [], stats }: Props) {
    const getRoleBadgeVariant = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'destructive';
            case 'editor':
                return 'default';
            default:
                return 'outline';
        }
    };

    const getInvitationStatus = (invitation: Invitation) => {
        if (invitation.used_at) return 'Used';
        if (invitation.expires_at && new Date(invitation.expires_at) < new Date()) return 'Expired';
        return 'Active';
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Used':
                return 'default';
            case 'Expired':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Team', href: '/team' },
            ]}
        >
            <Head title="Team Overview" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team Overview</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage your team members and invitations.</p>
                    </div>
                    <Button asChild>
                        <Link href="/invitations/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Invite Member
                        </Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.total_users || users.length}</div>
                            <p className="text-xs text-muted-foreground">active team members</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Invitations</CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.active_invitations || invitations.filter((i) => !i.used_at).length}</div>
                            <p className="text-xs text-muted-foreground">pending invites</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Recent Joins</CardTitle>
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats?.recent_registrations ||
                                    users.filter((u) => new Date(u.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                            </div>
                            <p className="text-xs text-muted-foreground">this month</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Team Members */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Team Members
                            </CardTitle>
                            <CardDescription>Current members of your team</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {users.length === 0 ? (
                                <div className="py-8 text-center text-muted-foreground">
                                    <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                                    <p>No team members found</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {users.slice(0, 8).map((user) => (
                                        <div key={user.id} className="flex items-center justify-between rounded-lg border p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                                    <Users className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {Array.isArray(user.roles)
                                                    ? user.roles.map((role) => (
                                                          <Badge key={role.name} variant={getRoleBadgeVariant(role.name)} className="text-xs">
                                                              {role.name}
                                                          </Badge>
                                                      ))
                                                    : null}
                                                {!user.email_verified_at && (
                                                    <Badge variant="outline" className="text-xs">
                                                        Unverified
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {users.length > 8 && (
                                        <div className="pt-4 text-center">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href="/users">View All Members</Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pending Invitations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                Pending Invitations
                            </CardTitle>
                            <CardDescription>Invitations waiting to be accepted</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {invitations.length === 0 ? (
                                <div className="py-8 text-center text-muted-foreground">
                                    <Mail className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                                    <p>No pending invitations</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {invitations.slice(0, 8).map((invitation) => {
                                        const status = getInvitationStatus(invitation);
                                        return (
                                            <div key={invitation.id} className="flex items-center justify-between rounded-lg border p-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                                        <Mail className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{invitation.email}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Invited {formatRelativeTime(invitation.created_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {invitation.role}
                                                    </Badge>
                                                    <Badge variant={getStatusVariant(status)} className="text-xs">
                                                        {status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {invitations.length > 8 && (
                                        <div className="pt-4 text-center">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href="/invitations">View All Invitations</Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

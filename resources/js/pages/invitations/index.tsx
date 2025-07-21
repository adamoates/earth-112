import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Mail, Plus } from 'lucide-react';

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
    invitations: Invitation[];
}

export default function InvitationsIndex({ invitations = [] }: Props) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Invitations', href: '/invitations' },
            ]}
        >
            <Head title="Invitations" />
            <div className="flex flex-1 flex-col gap-6 p-8">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invitations</h1>
                    <Button asChild>
                        <Link href="/invitations/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Send Invitation
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            All Invitations
                        </CardTitle>
                        <CardDescription>List of all invitations sent to users</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {invitations.length === 0 ? (
                            <div className="text-center text-gray-500 dark:text-gray-400">No invitations found.</div>
                        ) : (
                            <div className="space-y-3">
                                {invitations.map((invitation) => (
                                    <div key={invitation.id} className="flex items-center justify-between rounded-lg border p-4">
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">{invitation.email}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                Role: {invitation.role} • Created: {new Date(invitation.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={`/invitations/${invitation.id}`}>View</Link>
                                            </Button>
                                            <Button asChild size="sm" variant="ghost">
                                                <Link href={`/invitations/${invitation.id}/resend`} method="post" as="button">
                                                    Resend
                                                </Link>
                                            </Button>
                                            <Button asChild size="sm" variant="destructive">
                                                <Link href={`/invitations/${invitation.id}`} method="delete" as="button">
                                                    Cancel
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

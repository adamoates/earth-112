import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

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

export default function InvitationShow({ invitation }: { invitation: Invitation }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Invitations', href: '/invitations' },
                { title: 'Invitation Details', href: '#' },
            ]}
        >
            <Head title="Invitation Details" />
            <div className="flex flex-1 flex-col items-center justify-center p-8">
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle>Invitation Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <strong>Email:</strong> {invitation.email}
                        </div>
                        <div className="mb-4">
                            <strong>Role:</strong> {invitation.role}
                        </div>
                        <div className="mb-4">
                            <strong>Created At:</strong> {invitation.created_at}
                        </div>
                        <div className="mb-4">
                            <strong>Expires At:</strong> {invitation.expires_at || 'N/A'}
                        </div>
                        <div className="mb-4">
                            <strong>Status:</strong>{' '}
                            {invitation.used_at
                                ? 'Used'
                                : invitation.expires_at && new Date(invitation.expires_at) < new Date()
                                  ? 'Expired'
                                  : 'Active'}
                        </div>
                        {invitation.creator && (
                            <div className="mb-4">
                                <strong>Created By:</strong> {invitation.creator.name}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

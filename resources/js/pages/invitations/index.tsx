import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Plus } from 'lucide-react';
import { useState } from 'react';

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
    const [confirmId, setConfirmId] = useState<number | null>(null);
    const [confirmEmail, setConfirmEmail] = useState<string | null>(null);
    const [resendId, setResendId] = useState<number | null>(null);
    const [resendEmail, setResendEmail] = useState<string | null>(null);

    const { post, processing } = useForm();

    const handleResend = (invitationId: number) => {
        post(route('invitations.resend', invitationId), {
            onSuccess: () => {
                setResendId(null);
                setResendEmail(null);
            },
            onError: () => {
                // Keep modal open on error so user can try again
            },
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Invitations', href: '/invitations' },
            ]}
        >
            <Head title="Invitations" />
            <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-8">
                <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">Invitations</h1>
                    <Button asChild>
                        <Link href="/invitations/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Send Invitation
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
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
                                    <div
                                        key={invitation.id}
                                        className="flex flex-col items-start justify-between gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate font-medium text-gray-900 dark:text-white">{invitation.email}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                Role: {invitation.role} • Created: {new Date(invitation.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center gap-2 sm:w-auto">
                                            <Button asChild size="sm" variant="outline" className="flex-1 sm:flex-none">
                                                <Link href={`/invitations/${invitation.id}`}>View</Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="flex-1 sm:flex-none"
                                                onClick={() => {
                                                    setResendId(invitation.id);
                                                    setResendEmail(invitation.email);
                                                }}
                                            >
                                                Resend
                                            </Button>
                                            <Dialog
                                                open={confirmId === invitation.id}
                                                onOpenChange={(open) => {
                                                    if (!open) setConfirmId(null);
                                                }}
                                            >
                                                <DialogTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        className="flex-1 sm:flex-none"
                                                        onClick={() => {
                                                            setConfirmId(invitation.id);
                                                            setConfirmEmail(invitation.email);
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Cancel Invitation</DialogTitle>
                                                        <DialogDescription>
                                                            Are you sure you want to cancel the invitation for{' '}
                                                            <span className="font-semibold">{confirmEmail}</span>? This action cannot be undone.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button variant="outline" onClick={() => setConfirmId(null)}>
                                                            No, keep it
                                                        </Button>
                                                        <Button asChild variant="destructive">
                                                            <Link href={`/invitations/${invitation.id}`} method="delete" as="button">
                                                                Yes, cancel invitation
                                                            </Link>
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Resend Confirmation Dialog */}
                <Dialog
                    open={resendId !== null}
                    onOpenChange={(open) => {
                        if (!open) {
                            setResendId(null);
                            setResendEmail(null);
                        }
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Resend Invitation</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to resend the invitation to <span className="font-semibold">{resendEmail}</span>?
                                <br />
                                <br />
                                This will send a new invitation email to the recipient with the same invitation link.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setResendId(null);
                                    setResendEmail(null);
                                }}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
                            <Button variant="default" onClick={() => resendId && handleResend(resendId)} disabled={processing}>
                                {processing ? 'Sending...' : 'Yes, resend invitation'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}

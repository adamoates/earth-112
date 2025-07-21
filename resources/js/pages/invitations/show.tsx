import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Clock, Mail, RefreshCw, XCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

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
        href: '/invitations',
    },
    {
        title: 'Invitation Details',
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
    invitation: Invitation;
}

export default function ShowInvitation({ invitation }: Props) {
    const { post, processing } = useForm();

    const handleResend: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('invitations.resend', invitation.id));
    };

    const getStatusBadge = () => {
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

    const isExpired = invitation.expires_at && new Date(invitation.expires_at) < new Date();
    const isUsed = !!invitation.used_at;
    const canResend = !isUsed && !isExpired;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invitation Details" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="/invitations">
                            <ArrowLeft className="h-4 w-4" />
                        </a>
                    </Button>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invitation Details</h1>
                        <p className="text-gray-600 dark:text-gray-400">View and manage invitation information</p>
                    </div>
                </div>

                {/* Invitation Details */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Invitation Information
                        </CardTitle>
                        <CardDescription>Details about this invitation and its current status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Status */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</span>
                            {getStatusBadge()}
                        </div>

                        {/* Email */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</span>
                            <span className="font-medium">{invitation.email}</span>
                        </div>

                        {/* Role */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</span>
                            <span className="font-medium">{getRoleDisplayName(invitation.role)}</span>
                        </div>

                        {/* Created */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</span>
                            <span className="font-medium">{new Date(invitation.created_at).toLocaleString()}</span>
                        </div>

                        {/* Creator */}
                        {invitation.creator && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</span>
                                <span className="font-medium">{invitation.creator.name}</span>
                            </div>
                        )}

                        {/* Expires */}
                        {invitation.expires_at && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Expires</span>
                                <span className="font-medium">{new Date(invitation.expires_at).toLocaleString()}</span>
                            </div>
                        )}

                        {/* Used */}
                        {invitation.used_at && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Used</span>
                                <span className="font-medium">{new Date(invitation.used_at).toLocaleString()}</span>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-4">
                            {canResend && (
                                <Button onClick={handleResend} disabled={processing}>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    {processing ? 'Resending...' : 'Resend Email'}
                                </Button>
                            )}
                            <Button variant="outline" asChild>
                                <Link href="/invitations">Back to Invitations</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Status Information */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {isUsed ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : isExpired ? (
                                <XCircle className="h-5 w-5 text-red-600" />
                            ) : (
                                <Clock className="h-5 w-5 text-blue-600" />
                            )}
                            Status Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isUsed ? (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                This invitation has been used to create an account. The user can now access the system with their assigned role.
                            </p>
                        ) : isExpired ? (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                This invitation has expired and can no longer be used. You can create a new invitation if needed.
                            </p>
                        ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                This invitation is active and can be used to create an account. The user will receive an email with a secure link to
                                complete their registration.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

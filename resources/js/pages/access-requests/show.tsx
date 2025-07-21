import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, CheckCircle, Shield, UserCheck, Users, XCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Access Requests',
        href: '/access-requests',
    },
    {
        title: 'Request Details',
        href: '#',
    },
];

type AccessRequest = {
    id: number;
    name: string;
    email: string;
    company: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    admin_notes?: string;
    reviewed_at?: string;
    created_at: string;
    reviewer?: {
        name: string;
    };
};

type Props = {
    accessRequest: AccessRequest;
};

export default function AccessRequestShow({ accessRequest }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        admin_notes: '',
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                        Pending
                    </Badge>
                );
            case 'approved':
                return (
                    <Badge variant="outline" className="border-green-600 text-green-600">
                        Approved
                    </Badge>
                );
            case 'rejected':
                return (
                    <Badge variant="outline" className="border-red-600 text-red-600">
                        Rejected
                    </Badge>
                );
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const handleApprove: FormEventHandler = (e) => {
        e.preventDefault();
        patch(`/access-requests/${accessRequest.id}/approve`);
    };

    const handleReject: FormEventHandler = (e) => {
        e.preventDefault();
        patch(`/access-requests/${accessRequest.id}/reject`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Access Request - ${accessRequest.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="/access-requests">
                            <ArrowLeft className="h-4 w-4" />
                        </a>
                    </Button>
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Request from {accessRequest.name}</h1>
                            {getStatusBadge(accessRequest.status)}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">Review and manage this access request</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Request Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Request Details
                            </CardTitle>
                            <CardDescription>Information provided by the applicant</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Name</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{accessRequest.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{accessRequest.email}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Company</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{accessRequest.company}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Reason for Access</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{accessRequest.reason}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Requested</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(accessRequest.created_at).toLocaleDateString()}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Review Actions */}
                    {accessRequest.status === 'pending' && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Review Actions
                                </CardTitle>
                                <CardDescription>Approve or reject this access request</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin Notes</p>
                                    <Textarea
                                        value={data.admin_notes}
                                        onChange={(e) => setData('admin_notes', e.target.value)}
                                        placeholder="Add notes about your decision..."
                                        rows={4}
                                    />
                                    <InputError message={errors.admin_notes} />
                                </div>

                                <div className="flex gap-2">
                                    <Button onClick={handleApprove} disabled={processing} className="flex-1 bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Approve Request
                                    </Button>
                                    <Button onClick={handleReject} disabled={processing} variant="destructive" className="flex-1">
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Reject Request
                                    </Button>
                                </div>

                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                                    <div className="flex items-start gap-3">
                                        <Shield className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
                                        <div className="text-sm text-amber-800 dark:text-amber-200">
                                            <p className="font-medium">Approval Process</p>
                                            <p className="mt-1">
                                                Approving this request will automatically create an invitation code and send it to the user's email
                                                address.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Review Status */}
                    {accessRequest.status !== 'pending' && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <UserCheck className="h-5 w-5" />
                                    Review Status
                                </CardTitle>
                                <CardDescription>Decision and notes</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    {accessRequest.status === 'approved' ? (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-600" />
                                    )}
                                    <span className="font-medium">{accessRequest.status === 'approved' ? 'Approved' : 'Rejected'}</span>
                                </div>

                                {accessRequest.reviewer && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Reviewed by</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {accessRequest.reviewer.name} on {new Date(accessRequest.reviewed_at!).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}

                                {accessRequest.admin_notes && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Admin Notes</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{accessRequest.admin_notes}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

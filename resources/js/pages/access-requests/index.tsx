import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { Clock, Mail, UserCheck, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Access Requests',
        href: '/access-requests',
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
    accessRequests: {
        data: AccessRequest[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};

export default function AccessRequestsIndex({ accessRequests }: Props) {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Access Requests" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Requests</h1>
                        <p className="text-gray-600 dark:text-gray-400">Review and manage access requests from potential users</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                            {accessRequests.data.filter((r) => r.status === 'pending').length} Pending
                        </Badge>
                        <Badge variant="outline" className="border-green-600 text-green-600">
                            {accessRequests.data.filter((r) => r.status === 'approved').length} Approved
                        </Badge>
                        <Badge variant="outline" className="border-red-600 text-red-600">
                            {accessRequests.data.filter((r) => r.status === 'rejected').length} Rejected
                        </Badge>
                    </div>
                </div>

                <div className="grid gap-4">
                    {accessRequests.data.map((request) => (
                        <Card key={request.id} className="transition-shadow hover:shadow-md">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{request.name}</CardTitle>
                                            <CardDescription className="flex items-center gap-2">
                                                <Mail className="h-4 w-4" />
                                                {request.email}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusBadge(request.status)}
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={`/access-requests/${request.id}`}>View Details</Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Company</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{request.company}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Requested</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(request.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Reason</p>
                                    <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{request.reason}</p>
                                </div>
                                {request.reviewer && (
                                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <UserCheck className="h-4 w-4" />
                                        Reviewed by {request.reviewer.name} on {new Date(request.reviewed_at!).toLocaleDateString()}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {accessRequests.data.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Clock className="mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No Access Requests</h3>
                            <p className="text-center text-gray-600 dark:text-gray-400">
                                No access requests have been submitted yet. They will appear here when users request access.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

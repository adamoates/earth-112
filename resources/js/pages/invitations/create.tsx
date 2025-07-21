import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Mail, Shield } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
        title: 'Send Invitation',
        href: '#',
    },
];

export default function CreateInvitation() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        role: 'viewer',
        expires_at: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('invitations.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Send Invitation" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="/invitations">
                            <ArrowLeft className="h-4 w-4" />
                        </a>
                    </Button>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Send Invitation</h1>
                        <p className="text-gray-600 dark:text-gray-400">Invite a new user to join Earth-112</p>
                    </div>
                </div>

                {/* Create Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Invitation Details
                        </CardTitle>
                        <CardDescription>Send an invitation email to a new user with appropriate role and permissions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="user@example.com"
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <Label htmlFor="role">Role *</Label>
                                <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="viewer">Viewer</SelectItem>
                                        <SelectItem value="editor">Editor</SelectItem>
                                        <SelectItem value="admin">Administrator</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.role} />
                            </div>

                            <div>
                                <Label htmlFor="expires_at">Expiration Date (Optional)</Label>
                                <Input
                                    id="expires_at"
                                    type="datetime-local"
                                    value={data.expires_at}
                                    onChange={(e) => setData('expires_at', e.target.value)}
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Leave empty to use default 48-hour expiration</p>
                                <InputError message={errors.expires_at} />
                            </div>

                            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                                <div className="flex items-start gap-3">
                                    <Shield className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
                                    <div className="text-sm text-amber-800 dark:text-amber-200">
                                        <p className="font-medium">Role Permissions</p>
                                        <ul className="mt-1 space-y-1">
                                            <li>
                                                <strong>Viewer:</strong> View analytics and basic information
                                            </li>
                                            <li>
                                                <strong>Editor:</strong> View analytics, manage access requests, create invitations
                                            </li>
                                            <li>
                                                <strong>Administrator:</strong> Full system access including user management
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={processing}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    {processing ? 'Sending...' : 'Send Invitation'}
                                </Button>
                                <Button variant="outline" type="button" asChild>
                                    <a href="/invitations">Cancel</a>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

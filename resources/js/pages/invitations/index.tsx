import { Head, useForm } from '@inertiajs/react';
import { Mail, Plus, Trash2 } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

interface Invitation {
    id: number;
    code: string;
    email: string;
    name?: string;
    role: string;
    used: boolean;
    expires_at?: string;
    created_at: string;
}

interface Props {
    invitations: Invitation[];
}

export default function InvitationsIndex({ invitations }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        name: '',
        role: 'user',
        expires_at: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('invitations.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Invitations" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Invitations</h1>
                    <p className="text-gray-600 dark:text-gray-400">Send invitations to new users</p>
                </div>

                {/* Create Invitation Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Send New Invitation
                        </CardTitle>
                        <CardDescription>
                            Create and send an invitation to a new user. They will receive an email with a registration link.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="name">Name (Optional)</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Full name"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="role">Role</Label>
                                    <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="admin">Administrator</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="expires_at">Expires At (Optional)</Label>
                                    <Input
                                        id="expires_at"
                                        type="datetime-local"
                                        value={data.expires_at}
                                        onChange={(e) => setData('expires_at', e.target.value)}
                                    />
                                    {errors.expires_at && <p className="mt-1 text-sm text-red-500">{errors.expires_at}</p>}
                                </div>
                            </div>

                            <Button type="submit" disabled={processing} className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Send Invitation
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Invitations List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Invitations</CardTitle>
                        <CardDescription>Track the status of sent invitations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {invitations.length === 0 ? (
                            <p className="py-8 text-center text-gray-500">No invitations sent yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {invitations.map((invitation) => (
                                    <div key={invitation.id} className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{invitation.email}</span>
                                                {invitation.name && <span className="text-gray-500">({invitation.name})</span>}
                                            </div>
                                            <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                                                <span>
                                                    Code: <code className="rounded bg-gray-100 px-1">{invitation.code}</code>
                                                </span>
                                                <span>Role: {invitation.role}</span>
                                                <span className={invitation.used ? 'text-green-600' : 'text-orange-600'}>
                                                    {invitation.used ? 'Used' : 'Pending'}
                                                </span>
                                                {invitation.expires_at && (
                                                    <span>Expires: {new Date(invitation.expires_at).toLocaleDateString()}</span>
                                                )}
                                            </div>
                                        </div>
                                        {!invitation.used && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm('Delete this invitation?')) {
                                                        // Handle delete
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
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

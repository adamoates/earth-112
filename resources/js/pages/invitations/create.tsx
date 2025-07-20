import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

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
        title: 'Create Invitation',
        href: '#',
    },
];

export default function CreateInvitation() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        name: '',
        role: 'user',
        expires_at: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/invitations');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Invitation" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="/invitations">
                            <ArrowLeft className="h-4 w-4" />
                        </a>
                    </Button>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Invitation</h1>
                        <p className="text-gray-600 dark:text-gray-400">Generate a new invitation code for user access</p>
                    </div>
                </div>

                {/* Create Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Invitation Details</CardTitle>
                        <CardDescription>Create a new invitation code for user registration.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email (Optional)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="user@example.com"
                                />
                                {errors.email && <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                                <p className="text-xs text-gray-500">Leave blank for open invitations</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Name (Optional)</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="User's name"
                                />
                                {errors.name && <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Administrator</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-sm text-red-600 dark:text-red-400">{errors.role}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="expires_at">Expires At (Optional)</Label>
                                <Input
                                    id="expires_at"
                                    type="datetime-local"
                                    value={data.expires_at}
                                    onChange={(e) => setData('expires_at', e.target.value)}
                                />
                                {errors.expires_at && <p className="text-sm text-red-600 dark:text-red-400">{errors.expires_at}</p>}
                                <p className="text-xs text-gray-500">Leave blank for no expiration</p>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Creating...' : 'Create Invitation'}
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

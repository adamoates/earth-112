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
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Edit User',
        href: '#',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    role_display: string;
}

interface Role {
    name: string;
    display: string;
}

interface Props {
    user: User;
    roles: Role[];
}

export default function EditUser({ user, roles }: Props) {
    console.log('EditUser props:', { user, roles }); // Debug logging

    // Convert roles to array if it's an object
    const rolesArray: Role[] = Array.isArray(roles) ? roles : (Object.values(roles || {}) as Role[]);
    console.log('Roles array:', rolesArray);

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    const handleRoleChange = (value: string) => {
        console.log('Role change:', value);
        setData('role', value);
    };

    // Ensure we have a valid role value
    const currentRole = data.role || user.role || (rolesArray.length > 0 ? rolesArray[0].name : '');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="/users">
                            <ArrowLeft className="h-4 w-4" />
                        </a>
                    </Button>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit User</h1>
                        <p className="text-gray-600 dark:text-gray-400">Update user information and role</p>
                    </div>
                </div>

                {/* Edit Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>User Information</CardTitle>
                        <CardDescription>Update the user's details and role assignment.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                {errors.email && <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <div className="mb-2 text-xs text-gray-500">
                                    Debug: Current role: "{currentRole}", Available roles: {rolesArray.length}
                                    <br />
                                    User role: "{user.role}", Roles: {rolesArray.map((r: Role) => r.name).join(', ')}
                                    <br />
                                    Is Array: {Array.isArray(roles) ? 'Yes' : 'No'}, Type: {typeof roles}
                                </div>
                                <Select value={currentRole} onValueChange={handleRoleChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {rolesArray.length > 0 ? (
                                            rolesArray.map((role: Role) => (
                                                <SelectItem key={role.name} value={role.name}>
                                                    {role.display}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="no-roles" disabled>
                                                No roles available
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-sm text-red-600 dark:text-red-400">{errors.role}</p>}
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                                <Button variant="outline" type="button" asChild>
                                    <a href="/users">Cancel</a>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

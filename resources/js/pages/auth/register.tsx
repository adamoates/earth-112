import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Shield, UserPlus } from 'lucide-react';

interface Invitation {
    email: string;
    role: string;
    token: string;
}

interface Props {
    invitation?: Invitation;
}

export default function Register({ invitation }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: invitation?.email || '',
        password: '',
        password_confirmation: '',
        token: invitation?.token || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('invitations.register'));
    };

    return (
        <AuthLayout title="Create Account" description="Enter your details below to create your account">
            <Head title="Create Account" />

            <div className="mx-auto w-full max-w-md">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                            <UserPlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{invitation ? 'Accept Invitation' : 'Create Account'}</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {invitation ? 'Complete your registration to join Earth-112.' : 'Create your account to get started.'}
                        </p>
                    </div>

                    {invitation && (
                        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                            <div className="flex items-start gap-3">
                                <Shield className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
                                <div className="text-sm text-amber-800 dark:text-amber-200">
                                    <p className="font-medium">Invitation Details</p>
                                    <p className="mt-1">
                                        You're being invited as a <strong>{invitation.role}</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={submit}>
                        <div>
                            <Label htmlFor="name" className="text-gray-900 dark:text-white">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                disabled={processing}
                                placeholder="John Doe"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-gray-900 dark:text-white">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                disabled={processing || !!invitation}
                                placeholder="user@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-gray-900 dark:text-white">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                disabled={processing}
                                placeholder="Enter password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation" className="text-gray-900 dark:text-white">
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        {invitation && <input type="hidden" name="token" value={invitation.token} />}

                        <Button type="submit" className="w-full" disabled={processing}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            {processing ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <a href={route('login')} className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { ArrowRight, Lock, Mail, Shield, User, UserPlus } from 'lucide-react';

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
        <AuthLayout title="Create Account" description="Join Earth-112 with your preferred method">
            <Head title="Create Account" />

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                    {/* Left Side - Social Sign Up */}
                    <div className="rounded-lg border bg-card p-6 shadow-sm sm:p-8">
                        <div className="mb-6 text-center sm:mb-8">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                                <UserPlus className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">Quick Sign Up</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Create your account with Google in seconds</p>
                        </div>

                        <div className="space-y-4">
                            <a
                                href={route('social.login', 'google')}
                                className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 sm:px-6 sm:py-4 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                <svg className="mr-3 h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </a>

                            <div className="text-center">
                                <p className="text-xs text-gray-500 dark:text-gray-400">No password required • Instant setup • Secure</p>
                            </div>
                        </div>

                        {invitation && (
                            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
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
                    </div>

                    {/* Right Side - Email/Password Form */}
                    <div className="rounded-lg border bg-card p-6 shadow-sm sm:p-8">
                        <div className="mb-6 text-center">
                            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">Create with Email</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Set up your account with email and password</p>
                        </div>

                        <form className="space-y-4" onSubmit={submit}>
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter your full name"
                                        className="pl-10"
                                    />
                                </div>
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter your email"
                                        className="pl-10"
                                        disabled={!!invitation}
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Create a password"
                                        className="pl-10"
                                    />
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Confirm your password"
                                        className="pl-10"
                                    />
                                </div>
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                                disabled={processing}
                            >
                                {processing ? (
                                    'Creating account...'
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

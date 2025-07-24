import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Shield, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

interface PasswordProps {
    user: {
        is_pure_social_user: boolean;
        social_provider: string | null;
    };
}

export default function Password({ user }: PasswordProps) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Password settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    {user.is_pure_social_user ? (
                        <>
                            <HeadingSmall title="Set Up Password" description="Create a password so you can also sign in with your email address" />

                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                                <div className="flex items-start gap-3">
                                    <User className="mt-0.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <div className="text-sm text-blue-800 dark:text-blue-200">
                                        <p className="font-medium">Social Login Account</p>
                                        <p className="mt-1">
                                            You currently sign in with <strong>{user.social_provider}</strong>. Setting up a password will allow you
                                            to use both login methods.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <HeadingSmall title="Update password" description="Ensure your account is using a long, random password to stay secure" />
                    )}

                    <form onSubmit={updatePassword} className="space-y-6">
                        {!user.is_pure_social_user && (
                            <div className="grid gap-2">
                                <Label htmlFor="current_password">Current password</Label>

                                <Input
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    value={data.current_password}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    type="password"
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    placeholder="Current password"
                                />

                                <InputError message={errors.current_password} />
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="password">{user.is_pure_social_user ? 'New password' : 'New password'}</Label>

                            <Input
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete={user.is_pure_social_user ? 'new-password' : 'new-password'}
                                placeholder={user.is_pure_social_user ? 'Enter your new password' : 'New password'}
                                required
                                autoFocus={user.is_pure_social_user}
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>

                            <Input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                                required
                            />

                            <InputError message={errors.password_confirmation} />
                        </div>

                        {user.is_pure_social_user && (
                            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                                <div className="flex items-start gap-3">
                                    <Shield className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
                                    <div className="text-sm text-amber-800 dark:text-amber-200">
                                        <p className="font-medium">Benefits of Setting a Password</p>
                                        <ul className="mt-1 space-y-1">
                                            <li>• Sign in with email and password</li>
                                            <li>• Use password reset if needed</li>
                                            <li>• Access your account even if social login is unavailable</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>
                                {user.is_pure_social_user ? (
                                    <>
                                        <Lock className="mr-2 h-4 w-4" />
                                        Set Password
                                    </>
                                ) : (
                                    'Save'
                                )}
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}

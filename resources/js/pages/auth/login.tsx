import { Head, useForm } from '@inertiajs/react';
import { ArrowRight, LoaderCircle, Lock, Mail, Shield } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    authSettings?: {
        google_auth_enabled: boolean;
        github_auth_enabled: boolean;
        discord_auth_enabled: boolean;
        invite_only_mode: boolean;
        open_registration: boolean;
    };
}

export default function Login({ status, canResetPassword, authSettings }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    // Check if any social auth is enabled
    const hasSocialAuth = authSettings?.google_auth_enabled || authSettings?.github_auth_enabled;

    return (
        <AuthLayout title="Welcome back" description="Sign in to your account">
            <Head title="Log in" />

            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-12">
                {/* Left Side - Social Login (only show if social auth is enabled) */}
                {hasSocialAuth && (
                    <section aria-labelledby="social-login-heading" className="rounded-lg border bg-card p-8 shadow-sm">
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 id="social-login-heading" className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                                Quick Sign In
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Sign in with your social account for instant access</p>
                        </div>

                        <div className="space-y-6">
                            {/* Google Auth */}
                            {authSettings?.google_auth_enabled && (
                                <a
                                    href={route('social.login', 'google')}
                                    className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-4 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    <svg className="mr-3 h-6 w-6" viewBox="0 0 24 24">
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
                            )}

                            {/* GitHub Auth */}
                            {authSettings?.github_auth_enabled && (
                                <a
                                    href={route('social.login', 'github')}
                                    className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-4 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    <svg className="mr-3 h-6 w-6" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                        />
                                    </svg>
                                    Continue with GitHub
                                </a>
                            )}

                            {/* Discord Auth */}
                            {authSettings?.discord_auth_enabled && (
                                <a
                                    href={route('social.login', 'discord')}
                                    className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-4 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    <svg className="mr-3 h-6 w-6" viewBox="0 0 24 24">
                                        <path
                                            fill="#5865F2"
                                            d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"
                                        />
                                    </svg>
                                    Continue with Discord
                                </a>
                            )}

                            <div className="text-center">
                                <p className="text-xs text-gray-500 dark:text-gray-400">No password required • Instant access • Secure</p>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
                            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                Need access to this platform?{' '}
                                <TextLink
                                    href={route('request-access')}
                                    className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    Request Access
                                </TextLink>
                            </p>
                        </div>
                    </section>
                )}

                {/* Right Side - Email/Password Form */}
                <section
                    aria-labelledby="email-login-heading"
                    className={`rounded-lg border bg-card p-8 shadow-sm ${!hasSocialAuth ? 'lg:col-span-2' : ''}`}
                >
                    <div className="mb-8 text-center">
                        <h2 id="email-login-heading" className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Sign in with Email
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Use your email and password to access your account</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter your email"
                                    className="h-10 pl-10"
                                />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </Label>
                                {canResetPassword && (
                                    <TextLink
                                        href={route('password.request')}
                                        className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Forgot password?
                                    </TextLink>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter your password"
                                    className="h-10 pl-10"
                                />
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox id="remember" name="remember" checked={data.remember} onClick={() => setData('remember', !data.remember)} />
                            <Label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300">
                                Remember me
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            className="h-10 w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    {status && (
                        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                            <p className="text-sm text-green-800 dark:text-green-200">{status}</p>
                        </div>
                    )}
                </section>
            </div>
        </AuthLayout>
    );
}

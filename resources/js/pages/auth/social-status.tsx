import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
import { CheckCircle, LoaderCircle, Shield, UserPlus } from 'lucide-react';
import { useEffect } from 'react';

interface SocialStatusProps {
    status: 'processing' | 'success' | 'error';
    message: string;
    user?: {
        name: string;
        email: string;
        role: string;
    };
    isNewUser?: boolean;
    provider: string;
}

export default function SocialStatus({ status, message, user, isNewUser, provider }: SocialStatusProps) {
    // Auto-redirect to dashboard on success
    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => {
                window.location.href = route('dashboard');
            }, 3000); // Redirect after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [status]);

    const getStatusIcon = () => {
        switch (status) {
            case 'processing':
                return <LoaderCircle className="h-8 w-8 animate-spin text-blue-600" />;
            case 'success':
                return <CheckCircle className="h-8 w-8 text-green-600" />;
            case 'error':
                return <Shield className="h-8 w-8 text-red-600" />;
            default:
                return <LoaderCircle className="h-8 w-8 animate-spin text-blue-600" />;
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'processing':
                return 'text-blue-600';
            case 'success':
                return 'text-green-600';
            case 'error':
                return 'text-red-600';
            default:
                return 'text-blue-600';
        }
    };

    return (
        <AuthLayout title="Social Login Status" description="Processing your social login">
            <Head title="Social Login Status" />

            <div className="mx-auto w-full max-w-md">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            {getStatusIcon()}
                        </div>

                        <h2 className={`text-lg font-semibold ${getStatusColor()}`}>
                            {status === 'processing' && 'Processing Your Login...'}
                            {status === 'success' && 'Login Successful!'}
                            {status === 'error' && 'Login Failed'}
                        </h2>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{message}</p>

                        {status === 'success' && user && (
                            <div className="mt-6 space-y-4">
                                {isNewUser && (
                                    <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                                        <div className="flex items-start gap-3">
                                            <UserPlus className="mt-0.5 h-4 w-4 text-green-600 dark:text-green-400" />
                                            <div className="text-sm text-green-800 dark:text-green-200">
                                                <p className="font-medium">Account Created Successfully!</p>
                                                <p className="mt-1">Welcome to Earth-112, {user.name}!</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                                    <div className="flex items-start gap-3">
                                        <Shield className="mt-0.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        <div className="text-sm text-blue-800 dark:text-blue-200">
                                            <p className="font-medium">Account Details</p>
                                            <p className="mt-1">
                                                <strong>Name:</strong> {user.name}
                                            </p>
                                            <p className="mt-1">
                                                <strong>Email:</strong> {user.email}
                                            </p>
                                            <p className="mt-1">
                                                <strong>Role:</strong> {user.role}
                                            </p>
                                            <p className="mt-1">
                                                <strong>Provider:</strong> {provider}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Redirecting you to the dashboard in 3 seconds...</p>

                                    <div className="flex flex-col gap-2">
                                        <a
                                            href={route('dashboard')}
                                            className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                                        >
                                            Go to Dashboard Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="mt-6">
                                <a
                                    href={route('login')}
                                    className="inline-flex w-full items-center justify-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Back to Login
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

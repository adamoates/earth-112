import AuthLayout from '@/layouts/auth-layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Cloud, Lock, Zap } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AuthLayout title="Welcome to earth-112" description="Build amazing web applications with Laravel. Fast, secure, and scalable.">
            <Head title="Welcome" />

            <div className="space-y-8">
                {/* Hero Content */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">Welcome to earth-112</h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
                        Build amazing web applications with Laravel. Fast, secure, and scalable.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    Get Started
                                </Link>
                                <Link href={route('login')} className="text-sm leading-6 font-semibold text-gray-900 dark:text-white">
                                    Login <span aria-hidden="true">→</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Features Section */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Why Choose Laravel?</h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Everything you need to build modern web applications</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Fast Development</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Elegant syntax and powerful tools help you build features quickly without sacrificing quality.
                            </p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Secure by Default</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Built-in protection against common vulnerabilities keeps your application and users safe.
                            </p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                <Cloud className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Scalable Architecture</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                From small projects to enterprise applications, Laravel scales with your needs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Ready to Get Started?</h3>
                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">Join thousands of developers building with Laravel</p>
                    {!auth.user ? (
                        <Link
                            href={route('register')}
                            className="inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Create Your Account
                        </Link>
                    ) : (
                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Go to Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </AuthLayout>
    );
}

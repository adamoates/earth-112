import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Cloud, Lock, Zap } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome" />
            {/* Test deployment - GitHub Actions integration */}
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Navigation */}
                <nav className="bg-white shadow-sm dark:bg-gray-800 dark:shadow-gray-900/20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">earth-112</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="bg-white dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
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
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose Laravel?</h3>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Everything you need to build modern web applications</p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800 dark:shadow-gray-900/20">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Fast Development</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Elegant syntax and powerful tools help you build features quickly without sacrificing quality.
                                </p>
                            </div>
                            <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800 dark:shadow-gray-900/20">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                    <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Secure by Default</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Built-in protection against common vulnerabilities keeps your application and users safe.
                                </p>
                            </div>
                            <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800 dark:shadow-gray-900/20">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                    <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Scalable Architecture</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    From small projects to enterprise applications, Laravel scales with your needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-blue-600 py-16">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <h3 className="mb-4 text-3xl font-bold text-white">Ready to Get Started?</h3>
                        <p className="mb-8 text-xl text-blue-100">Join thousands of developers building with Laravel</p>
                        {!auth.user ? (
                            <Link
                                href={route('register')}
                                className="inline-block rounded-md bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
                            >
                                Create Your Account
                            </Link>
                        ) : (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-md bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
                            >
                                Go to Dashboard
                            </Link>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 py-12 text-gray-400">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p>&copy; {new Date().getFullYear()} earth-112. All rights reserved.</p>
                            <div className="mt-4 space-x-6">
                                <a href="#" className="hover:text-white">
                                    Privacy Policy
                                </a>
                                <a href="#" className="hover:text-white">
                                    Terms of Service
                                </a>
                                <a href="#" className="hover:text-white">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

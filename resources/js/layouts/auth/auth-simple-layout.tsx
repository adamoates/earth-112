import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Navigation */}
            <nav className="bg-white shadow-sm dark:bg-gray-800 dark:shadow-gray-900/20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link href={route('home')} className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">earth-112</h1>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link
                                href={route('home')}
                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Auth Form Container */}
            <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-lg">
                    <div className="rounded-lg bg-white px-4 py-8 shadow-sm sm:px-10 dark:bg-gray-800 dark:shadow-gray-900/20">
                        <div className="mb-6 sm:mx-auto sm:w-full sm:max-w-md">
                            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
                            {description && <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">{description}</p>}
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

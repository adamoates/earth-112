import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href={route('home')} className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900">earth-112</h1>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link href={route('home')} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Auth Form Container */}
            <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
                            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                                {title}
                            </h2>
                            {description && (
                                <p className="mt-2 text-center text-sm text-gray-600">
                                    {description}
                                </p>
                            )}
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

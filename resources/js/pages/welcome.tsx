import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Zap, Lock, Cloud } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome" />
            {/* Test deployment - GitHub Actions integration */}
            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold text-gray-900">earth-112</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link 
                                        href={route('dashboard')} 
                                        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link 
                                            href={route('login')} 
                                            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Login
                                        </Link>
                                        <Link 
                                            href={route('register')} 
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
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
                <section className="bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Welcome to earth-112
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                                Build amazing web applications with Laravel. Fast, secure, and scalable.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                {auth.user ? (
                                    <Link 
                                        href={route('dashboard')} 
                                        className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link 
                                            href={route('register')} 
                                            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        >
                                            Get Started
                                        </Link>
                                        <Link 
                                            href={route('login')} 
                                            className="text-sm font-semibold leading-6 text-gray-900"
                                        >
                                            Login <span aria-hidden="true">→</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-gray-50 py-24 sm:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900">Why Choose Laravel?</h3>
                            <p className="mt-4 text-lg text-gray-600">Everything you need to build modern web applications</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-lg p-8 shadow-sm">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-blue-600" />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Fast Development</h4>
                                <p className="text-gray-600">Elegant syntax and powerful tools help you build features quickly without sacrificing quality.</p>
                            </div>
                            <div className="bg-white rounded-lg p-8 shadow-sm">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Lock className="w-6 h-6 text-blue-600" />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Secure by Default</h4>
                                <p className="text-gray-600">Built-in protection against common vulnerabilities keeps your application and users safe.</p>
                            </div>
                            <div className="bg-white rounded-lg p-8 shadow-sm">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Cloud className="w-6 h-6 text-blue-600" />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Scalable Architecture</h4>
                                <p className="text-gray-600">From small projects to enterprise applications, Laravel scales with your needs.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-blue-600 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
                        <p className="text-xl text-blue-100 mb-8">Join thousands of developers building with Laravel</p>
                        {!auth.user ? (
                            <Link 
                                href={route('register')} 
                                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
                            >
                                Create Your Account
                            </Link>
                        ) : (
                            <Link 
                                href={route('dashboard')} 
                                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
                            >
                                Go to Dashboard
                            </Link>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-400 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p>&copy; {new Date().getFullYear()} earth-112. All rights reserved.</p>
                            <div className="mt-4 space-x-6">
                                <a href="#" className="hover:text-white">Privacy Policy</a>
                                <a href="#" className="hover:text-white">Terms of Service</a>
                                <a href="#" className="hover:text-white">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
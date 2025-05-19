<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-white">

<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="h-full antialiased text-gray-800">
    <!-- Navbar -->
    <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <div class="flex items-center gap-2">
                <span class="text-xl font-bold text-blue-600">{{ config('app.name') }}</span>
            </div>
            <div class="flex items-center gap-4">
                @auth
                    <a href="{{ route('dashboard') }}" class="text-sm font-medium text-gray-700 hover:text-blue-600">
                        Dashboard
                    </a>
                @else
                    <a href="{{ route('login') }}" class="text-sm font-medium text-gray-700 hover:text-blue-600">
                        Login
                    </a>
                    <a href="{{ route('register') }}"
                        class="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                        Register
                    </a>
                @endauth
            </div>
        </div>
    </header>

    <!-- Hero -->
    <div class="relative isolate overflow-hidden bg-gray-50 py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-3xl text-center">
                <h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
                    Welcome to {{ config('app.name') }}
                </h1>
                <p class="mt-6 text-lg leading-8 text-gray-600">
                    The fastest way to build your Laravel applications with modern design and simplicity.
                </p>
            </div>
        </div>
    </div>

    <!-- Features -->
    <section class="py-24 bg-white">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="max-w-2xl mx-auto text-center">
                <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Features</h2>
                <p class="mt-4 text-gray-600">What makes {{ config('app.name') }} special?</p>
            </div>

            <div class="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                <div class="flex flex-col items-start">
                    <div class="rounded-lg bg-blue-100 p-2">
                        <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12l2 2l4 -4m1 -5a9 9 0 1 1 -9 0a9 9 0 0 1 9 0z" />
                        </svg>
                    </div>
                    <h3 class="mt-4 text-lg font-semibold">Secure Auth</h3>
                    <p class="mt-2 text-sm text-gray-600">Fully integrated authentication with Laravel Breeze and
                        passwordless options.</p>
                </div>

                <div class="flex flex-col items-start">
                    <div class="rounded-lg bg-blue-100 p-2">
                        <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 17v-6h13m0 0l-4 4m4-4l-4-4M3 7h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3" />
                        </svg>
                    </div>
                    <h3 class="mt-4 text-lg font-semibold">Built for Speed</h3>
                    <p class="mt-2 text-sm text-gray-600">Lightweight with Vite and Tailwind CSS for fast development
                        and deploys.</p>
                </div>

                <div class="flex flex-col items-start">
                    <div class="rounded-lg bg-blue-100 p-2">
                        <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h1l3 10l4-16l3 10h4l1-4" />
                        </svg>
                    </div>
                    <h3 class="mt-4 text-lg font-semibold">Customizable</h3>
                    <p class="mt-2 text-sm text-gray-600">Clean foundation with optional Alpine.js or Livewire
                        integration.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-100 border-t py-6">
        <div class="mx-auto max-w-7xl px-6 flex justify-between text-sm text-gray-500">
            <p>&copy; {{ now()->year }} {{ config('app.name') }}. All rights reserved.</p>
            <div class="space-x-4">
                <a href="#" class="hover:underline">Privacy</a>
                <a href="#" class="hover:underline">Terms</a>
            </div>
        </div>
    </footer>
</body>

</html>

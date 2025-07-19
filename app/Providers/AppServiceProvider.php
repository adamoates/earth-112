<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Explicitly disable SSR at the service provider level
        Config::set('inertia.ssr.enabled', false);
        Config::set('inertia.ssr.url', null);
        Config::set('inertia.ssr.bundle', null);
        Config::set('inertia.ssr.timeout', 0);
        Config::set('inertia.ssr.ping_interval', 0);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Explicitly disable SSR to prevent connection attempts
        Config::set('inertia.ssr.enabled', false);
        Config::set('inertia.ssr.url', null);
        Config::set('inertia.ssr.bundle', null);
        Config::set('inertia.ssr.timeout', 0);
        Config::set('inertia.ssr.ping_interval', 0);

        // Remove any SSR-related environment variables
        if (function_exists('env')) {
            putenv('INERTIA_SSR=false');
            putenv('SSR_URL=');
            putenv('INERTIA_SSR_PORT=');
            putenv('INERTIA_SSR_URL=');
        }
    }
}

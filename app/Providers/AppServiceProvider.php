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
        // Disable SSR completely
        Config::set('inertia.ssr.enabled', false);

        // Use file cache during deployment to avoid database connection issues
        if (app()->environment('production') && !app()->runningInConsole()) {
            Config::set('cache.default', 'file');
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Ensure SSR remains disabled
        Config::set('inertia.ssr.enabled', false);

        // Use file cache during deployment to avoid database connection issues
        if (app()->environment('production')) {
            Config::set('cache.default', 'file');
        }
    }
}

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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Ensure SSR remains disabled
        Config::set('inertia.ssr.enabled', false);
    }
}

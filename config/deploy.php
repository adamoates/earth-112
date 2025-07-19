<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Deployment Configuration
    |--------------------------------------------------------------------------
    |
    | This configuration file contains settings for deployment processes
    | that should avoid database connections during build/deployment.
    |
    */

    'skip_database_commands' => [
        'artisan migrate',
        'artisan db:seed',
        'artisan db:show',
        'artisan config:cache', // This can cause DB connection issues
    ],

    'build_commands' => [
        'composer install --no-dev --optimize-autoloader',
        'npm ci --no-audit',
        'npm run build',
        'php artisan view:cache',
        'php artisan route:cache',
    ],

    'clear_commands' => [
        'php artisan config:clear',
        'php artisan cache:clear',
        'php artisan view:clear',
        'php artisan route:clear',
    ],
];

<?php

/**
 * Social OAuth Debugging Script
 * Run this on your production server to diagnose OAuth issues
 */

echo "=== Social OAuth Debugging Script ===\n\n";

// 1. Check environment variables
echo "1. Environment Variables Check:\n";
echo "--------------------------------\n";
$envVars = [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_REDIRECT_URI',
    'GITHUB_CLIENT_ID',
    'GITHUB_CLIENT_SECRET',
    'GITHUB_REDIRECT_URI',
    'DISCORD_CLIENT_ID',
    'DISCORD_CLIENT_SECRET',
    'DISCORD_REDIRECT_URI'
];

foreach ($envVars as $var) {
    $value = env($var);
    $status = $value ? 'Set' : 'Not Set';
    echo "$var: $status\n";
    if ($value && strlen($value) > 20) {
        echo "  Value: " . substr($value, 0, 10) . "..." . substr($value, -10) . "\n";
    }
}
echo "\n";

// 2. Check services configuration
echo "2. Services Configuration Check:\n";
echo "--------------------------------\n";
try {
    $services = config('services');
    foreach (['google', 'github', 'discord'] as $provider) {
        if (isset($services[$provider])) {
            echo "$provider config: OK\n";
            $config = $services[$provider];
            echo "  - client_id: " . (isset($config['client_id']) ? 'Set' : 'Missing') . "\n";
            echo "  - client_secret: " . (isset($config['client_secret']) ? 'Set' : 'Missing') . "\n";
            echo "  - redirect: " . (isset($config['redirect']) ? $config['redirect'] : 'Missing') . "\n";
        } else {
            echo "$provider config: Missing\n";
        }
    }
} catch (Exception $e) {
    echo "Error reading services config: " . $e->getMessage() . "\n";
}
echo "\n";

// 3. Check Socialite drivers
echo "3. Socialite Driver Check:\n";
echo "--------------------------\n";
foreach (['google', 'github', 'discord'] as $provider) {
    try {
        $driver = \Laravel\Socialite\Facades\Socialite::driver($provider);
        echo "$provider driver: OK\n";
    } catch (Exception $e) {
        echo "$provider driver: ERROR - " . $e->getMessage() . "\n";
    }
}
echo "\n";

// 4. Check recent OAuth errors in logs
echo "4. Recent OAuth Errors in Logs:\n";
echo "-------------------------------\n";
$logFile = storage_path('logs/laravel.log');
if (file_exists($logFile)) {
    $logContent = file_get_contents($logFile);
    $lines = explode("\n", $logContent);
    $recentLines = array_slice($lines, -100); // Last 100 lines

    $oauthErrors = [];
    foreach ($recentLines as $line) {
        if (
            stripos($line, 'oauth') !== false ||
            stripos($line, 'socialite') !== false ||
            stripos($line, 'google') !== false ||
            stripos($line, 'discord') !== false ||
            stripos($line, 'github') !== false
        ) {
            $oauthErrors[] = $line;
        }
    }

    if (empty($oauthErrors)) {
        echo "No recent OAuth-related errors found in logs.\n";
    } else {
        echo "Recent OAuth-related log entries:\n";
        foreach (array_slice($oauthErrors, -10) as $error) {
            echo "  " . trim($error) . "\n";
        }
    }
} else {
    echo "Log file not found: $logFile\n";
}
echo "\n";

// 5. Check SSL and network connectivity
echo "5. SSL and Network Check:\n";
echo "-------------------------\n";
$testUrls = [
    'https://accounts.google.com' => 'Google OAuth',
    'https://github.com' => 'GitHub OAuth',
    'https://discord.com' => 'Discord OAuth'
];

foreach ($testUrls as $url => $name) {
    $context = stream_context_create([
        'http' => [
            'timeout' => 10,
            'user_agent' => 'Laravel Socialite Debug'
        ]
    ]);

    $result = @file_get_contents($url, false, $context);
    if ($result !== false) {
        echo "$name ($url): OK\n";
    } else {
        echo "$name ($url): ERROR - Cannot connect\n";
    }
}
echo "\n";

// 6. Check auth settings
echo "6. Auth Settings Check:\n";
echo "----------------------\n";
try {
    $settings = \App\Models\AuthSetting::getCurrent();
    echo "Google Auth: " . ($settings->google_auth_enabled ? 'Enabled' : 'Disabled') . "\n";
    echo "GitHub Auth: " . ($settings->github_auth_enabled ? 'Enabled' : 'Disabled') . "\n";
    echo "Discord Auth: " . ($settings->discord_auth_enabled ? 'Enabled' : 'Disabled') . "\n";
} catch (Exception $e) {
    echo "Error reading auth settings: " . $e->getMessage() . "\n";
}
echo "\n";

// 7. Check cache status
echo "7. Cache Status:\n";
echo "----------------\n";
$cacheDrivers = ['file', 'redis', 'memcached'];
foreach ($cacheDrivers as $driver) {
    try {
        $cache = \Illuminate\Support\Facades\Cache::driver($driver);
        $cache->put('test_key', 'test_value', 1);
        $value = $cache->get('test_key');
        if ($value === 'test_value') {
            echo "$driver cache: OK\n";
        } else {
            echo "$driver cache: ERROR\n";
        }
    } catch (Exception $e) {
        echo "$driver cache: ERROR - " . $e->getMessage() . "\n";
    }
}
echo "\n";

echo "=== Debug Complete ===\n";
echo "Run this script on your production server to get detailed diagnostics.\n";

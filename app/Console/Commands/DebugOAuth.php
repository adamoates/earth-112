<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Models\AuthSetting;
use App\Config\SocialAuth;
use App\Config\AwsConfig;

class DebugOAuth extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'debug:oauth';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Debug OAuth configuration and issues';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Social OAuth Debugging Script ===');
        $this->newLine();

        // 1. Check environment variables
        $this->info('1. Environment Variables Check:');
        $this->line('--------------------------------');
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
            $this->line("$var: $status");
            if ($value && strlen($value) > 20) {
                $this->line("  Value: " . substr($value, 0, 10) . "..." . substr($value, -10));
            }
        }
        $this->newLine();

        // 2. Check services configuration
        $this->info('2. Services Configuration Check:');
        $this->line('--------------------------------');
        try {
            $services = config('services');
            foreach (['google', 'github', 'discord'] as $provider) {
                if (isset($services[$provider])) {
                    $this->line("$provider config: OK");
                    $config = $services[$provider];
                    $this->line("  - client_id: " . (isset($config['client_id']) ? 'Set' : 'Missing'));
                    $this->line("  - client_secret: " . (isset($config['client_secret']) ? 'Set' : 'Missing'));
                    $this->line("  - redirect: " . (isset($config['redirect']) ? $config['redirect'] : 'Missing'));
                } else {
                    $this->line("$provider config: Missing");
                }
            }
        } catch (\Exception $e) {
            $this->error("Error reading services config: " . $e->getMessage());
        }
        $this->newLine();

        // 3. Check Socialite drivers
        $this->info('3. Socialite Driver Check:');
        $this->line('--------------------------');
        foreach (['google', 'github', 'discord'] as $provider) {
            try {
                $driver = \Laravel\Socialite\Facades\Socialite::driver($provider);
                $this->line("$provider driver: OK");
            } catch (\Exception $e) {
                $this->error("$provider driver: ERROR - " . $e->getMessage());
            }
        }
        $this->newLine();

        // 4. Check recent OAuth errors in logs
        $this->info('4. Recent OAuth Errors in Logs:');
        $this->line('-------------------------------');
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
                $this->line("No recent OAuth-related errors found in logs.");
            } else {
                $this->line("Recent OAuth-related log entries:");
                foreach (array_slice($oauthErrors, -10) as $error) {
                    $this->line("  " . trim($error));
                }
            }
        } else {
            $this->line("Log file not found: $logFile");
        }
        $this->newLine();

        // 5. Check SSL and network connectivity
        $this->info('5. SSL and Network Check:');
        $this->line('-------------------------');
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
                $this->line("$name ($url): OK");
            } else {
                $this->error("$name ($url): ERROR - Cannot connect");
            }
        }
        $this->newLine();

        // 6. Check auth settings
        $this->info('6. Auth Settings Check:');
        $this->line('----------------------');
        try {
            $settings = AuthSetting::getCurrent();
            $this->line("Google Auth: " . ($settings->google_auth_enabled ? 'Enabled' : 'Disabled'));
            $this->line("GitHub Auth: " . ($settings->github_auth_enabled ? 'Enabled' : 'Disabled'));
            $this->line("Discord Auth: " . ($settings->discord_auth_enabled ? 'Enabled' : 'Disabled'));
        } catch (\Exception $e) {
            $this->error("Error reading auth settings: " . $e->getMessage());
        }
        $this->newLine();

        // 7. Check cache status
        $this->info('7. Cache Status:');
        $this->line('----------------');
        $cacheDrivers = ['file', 'redis', 'memcached'];
        foreach ($cacheDrivers as $driver) {
            try {
                $cache = Cache::driver($driver);
                $cache->put('test_key', 'test_value', 1);
                $value = $cache->get('test_key');
                if ($value === 'test_value') {
                    $this->line("$driver cache: OK");
                } else {
                    $this->error("$driver cache: ERROR");
                }
            } catch (\Exception $e) {
                $this->error("$driver cache: ERROR - " . $e->getMessage());
            }
        }
        $this->newLine();

        $this->info('=== Debug Complete ===');
        $this->line('Run this command on your production server to get detailed diagnostics.');

        return 0;
    }
}

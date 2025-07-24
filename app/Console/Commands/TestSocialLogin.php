<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;

class TestSocialLogin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'social:test-config';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test social login configuration';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔍 Testing Social Login Configuration...');

        // Check environment variables
        $this->checkEnvironmentVariables();

        // Check routes
        $this->checkRoutes();

        // Check database
        $this->checkDatabase();

        $this->info('✅ Configuration test complete!');

        return 0;
    }

    private function checkEnvironmentVariables(): void
    {
        $this->info('📋 Checking Environment Variables...');

        $required = [
            'GOOGLE_CLIENT_ID' => env('GOOGLE_CLIENT_ID'),
            'GOOGLE_CLIENT_SECRET' => env('GOOGLE_CLIENT_SECRET'),
            'GOOGLE_REDIRECT_URI' => env('GOOGLE_REDIRECT_URI'),
            'APP_URL' => env('APP_URL'),
        ];

        foreach ($required as $key => $value) {
            if (empty($value)) {
                $this->error("❌ {$key} is not set");
            } else {
                $this->info("✅ {$key}: " . ($key === 'GOOGLE_CLIENT_SECRET' ? '***' : $value));
            }
        }
    }

    private function checkRoutes(): void
    {
        $this->info('🛣️ Checking Routes...');

        $routes = [
            'social.login' => route('social.login', 'google'),
            'social.callback' => route('social.callback', 'google'),
            'social.status' => route('social.status'),
        ];

        foreach ($routes as $name => $url) {
            $this->info("✅ {$name}: {$url}");
        }
    }

    private function checkDatabase(): void
    {
        $this->info('🗄️ Checking Database...');

        try {
            // Check if social fields exist
            $user = new \App\Models\User();
            $table = $user->getTable();

            $columns = Schema::getColumnListing($table);
            $requiredColumns = ['social_provider', 'social_id', 'is_social_user'];

            foreach ($requiredColumns as $column) {
                if (in_array($column, $columns)) {
                    $this->info("✅ Column '{$column}' exists");
                } else {
                    $this->error("❌ Column '{$column}' missing");
                }
            }

            // Check if roles exist
            $roles = \Spatie\Permission\Models\Role::pluck('name')->toArray();
            $this->info("✅ Available roles: " . implode(', ', $roles));
        } catch (\Exception $e) {
            $this->error("❌ Database error: " . $e->getMessage());
        }
    }
}

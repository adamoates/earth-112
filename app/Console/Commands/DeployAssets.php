<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DeployAssets extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy:assets';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deploy assets safely without database dependencies';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Starting safe deployment process...');

        // Force file cache to avoid database issues
        config(['cache.default' => 'file']);

        try {
            // Clear caches safely
            $this->info('📝 Clearing caches...');
            $this->call('config:clear');
            $this->call('cache:clear');
            $this->call('view:clear');
            $this->call('route:clear');

            // Optimize for production
            $this->info('⚡ Optimizing for production...');
            $this->call('config:cache');
            $this->call('route:cache');
            $this->call('view:cache');

            $this->info('✅ Deployment completed successfully!');
            return 0;
        } catch (\Exception $e) {
            $this->error('❌ Deployment failed: ' . $e->getMessage());
            return 1;
        }
    }
}

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DisableSSR extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'inertia:start-ssr {--port=13714}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Override SSR start command to prevent deployment failures';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('SSR is disabled for this application. Skipping SSR server start.');
        $this->info('All rendering happens on the client-side.');
        return 0;
    }
}

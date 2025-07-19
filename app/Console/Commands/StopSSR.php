<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class StopSSR extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'inertia:stop-ssr';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Override SSR stop command to prevent deployment failures';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('SSR is disabled for this application. No SSR server to stop.');
        return 0;
    }
}

<?php

namespace App\Console\Commands;

use Database\Seeders\TestUsersSeeder;
use Illuminate\Console\Command;

class SeedTestUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seed:test-users {--force : Force seeding even in production}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed test users with different roles for local development';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        if (!$this->option('force') && app()->environment('production')) {
            $this->error('This command is not allowed in production without --force flag.');
            return 1;
        }

        $this->info('Seeding test users...');

        try {
            $seeder = new TestUsersSeeder();
            $seeder->run();

            $this->info('Test users seeded successfully!');
            $this->newLine();

            $this->info('Test User Credentials:');
            $this->newLine();

            $this->table(
                ['Role', 'Email', 'Password'],
                [
                    ['Admin', 'admin@test.com', 'password'],
                    ['Admin', 'superadmin@test.com', 'password'],
                    ['Editor', 'editor@test.com', 'password'],
                    ['Editor', 'content@test.com', 'password'],
                    ['Editor', 'teamlead@test.com', 'password'],
                    ['Viewer', 'viewer@test.com', 'password'],
                    ['Viewer', 'guest@test.com', 'password'],
                    ['Viewer', 'readonly@test.com', 'password'],
                    ['Viewer', 'observer@test.com', 'password'],
                    ['Multi-Role', 'admineditor@test.com', 'password'],
                    ['Multi-Role', 'editorviewer@test.com', 'password'],
                    ['Multi-Role', 'poweruser@test.com', 'password'],
                ]
            );

            return 0;
        } catch (\Exception $e) {
            $this->error('Failed to seed test users: ' . $e->getMessage());
            return 1;
        }
    }
}

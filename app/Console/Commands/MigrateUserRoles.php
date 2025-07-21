<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MigrateUserRoles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:migrate-roles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate existing users to Spatie roles';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting user role migration...');

        // Get all users that don't have any roles assigned
        $users = User::whereDoesntHave('roles')->get();

        if ($users->isEmpty()) {
            $this->info('No users found without roles. Migration complete.');
            return 0;
        }

        $this->info("Found {$users->count()} users to migrate.");

        foreach ($users as $user) {
            // Check if user has the old role column (for backward compatibility)
            if (DB::getSchemaBuilder()->hasColumn('users', 'role')) {
                $oldRole = DB::table('users')->where('id', $user->id)->value('role');

                if ($oldRole === 'admin') {
                    $user->assignRole('admin');
                    $this->line("Migrated user {$user->email} to admin role");
                } else {
                    $user->assignRole('viewer');
                    $this->line("Migrated user {$user->email} to viewer role");
                }
            } else {
                // Default to viewer role for new users
                $user->assignRole('viewer');
                $this->line("Assigned viewer role to user {$user->email}");
            }
        }

        $this->info('User role migration completed successfully!');
        return 0;
    }
}

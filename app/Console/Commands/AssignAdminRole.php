<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;

class AssignAdminRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:make-admin {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign admin role to a user by email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');

        // Find the user
        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error("User with email '{$email}' not found.");
            return 1;
        }

        // Ensure admin role exists
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        // Assign admin role
        $user->assignRole('admin');

        $this->info("Successfully assigned admin role to user: {$user->name} ({$user->email})");

        // Verify the role was assigned
        if ($user->hasRole('admin')) {
            $this->info("✓ User now has admin role");
        } else {
            $this->error("✗ Failed to assign admin role");
            return 1;
        }

        return 0;
    }
}

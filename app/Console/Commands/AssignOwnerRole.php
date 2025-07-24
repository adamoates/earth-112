<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class AssignOwnerRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:assign-owner {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign the owner role to a user by email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');

        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error("User with email '{$email}' not found.");
            return 1;
        }

        // Check if owner role exists
        $ownerRole = \Spatie\Permission\Models\Role::where('name', 'owner')->first();

        if (!$ownerRole) {
            $this->error("Owner role not found. Please run: php artisan db:seed --class=OwnerRoleSeeder");
            return 1;
        }

        // Assign owner role
        $user->assignRole('owner');

        $this->info("Owner role assigned to: {$user->name} ({$user->email})");

        return 0;
    }
}

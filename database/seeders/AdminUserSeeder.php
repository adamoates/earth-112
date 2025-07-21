<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get admin credentials from environment variables
        $adminEmail = env('ADMIN_EMAIL', 'admin@earth-112.com');
        $adminName = env('ADMIN_NAME', 'Admin User');
        $adminPassword = env('ADMIN_PASSWORD');

        if (!$adminPassword) {
            $this->command->error('ADMIN_PASSWORD environment variable is required for seeding admin users.');
            $this->command->info('Please set ADMIN_PASSWORD in your .env file.');
            return;
        }

        // Create primary admin user (only if it doesn't exist)
        $admin = User::firstOrCreate(
            ['email' => $adminEmail],
            [
                'name' => $adminName,
                'password' => bcrypt($adminPassword),
                'email_verified_at' => now(),
            ]
        );

        if (! $admin->hasRole('admin')) {
            $admin->assignRole('admin');
        }

        $this->command->info("Admin user created/updated: {$adminEmail}");
    }
}

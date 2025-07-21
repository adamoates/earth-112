<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class RoleTestUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create test users for local development only
        if (!app()->environment('local')) {
            $this->command->info('Skipping test users - only created in local environment.');
            return;
        }

        $testUsers = [
            [
                'name' => 'Test Editor',
                'email' => 'editor@test.com',
                'role' => 'editor',
            ],
            [
                'name' => 'Test Viewer',
                'email' => 'viewer@test.com',
                'role' => 'viewer',
            ],
            [
                'name' => 'Another Editor',
                'email' => 'editor2@test.com',
                'role' => 'editor',
            ],
            [
                'name' => 'Team Member',
                'email' => 'member@test.com',
                'role' => 'viewer',
            ],
        ];

        foreach ($testUsers as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => bcrypt('password123'),
                    'email_verified_at' => now(),
                ]
            );

            if (!$user->hasRole($userData['role'])) {
                $user->assignRole($userData['role']);
            }

            $this->command->info("Test user created/updated: {$userData['email']} ({$userData['role']})");
        }
    }
}
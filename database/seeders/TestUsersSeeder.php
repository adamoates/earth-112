<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin users
        $this->createAdminUsers();

        // Create editor users
        $this->createEditorUsers();

        // Create viewer users
        $this->createViewerUsers();

        // Create users with multiple roles
        $this->createMultiRoleUsers();
    }

    /**
     * Create admin test users.
     */
    private function createAdminUsers(): void
    {
        $adminUsers = [
            [
                'name' => 'Admin User',
                'email' => 'admin@test.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@test.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
        ];

        foreach ($adminUsers as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make($userData['password']),
                    'email_verified_at' => $userData['email_verified_at'],
                    'social_provider' => null,
                    'social_id' => null,
                    'is_social_user' => false,
                ]
            );

            if (!$user->hasRole('admin')) {
                $user->assignRole('admin');
            }
        }
    }

    /**
     * Create editor test users.
     */
    private function createEditorUsers(): void
    {
        $editorUsers = [
            [
                'name' => 'Editor User',
                'email' => 'editor@test.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Content Manager',
                'email' => 'content@test.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Team Lead',
                'email' => 'teamlead@test.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
        ];

        foreach ($editorUsers as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make($userData['password']),
                    'email_verified_at' => $userData['email_verified_at'],
                    'social_provider' => null,
                    'social_id' => null,
                    'is_social_user' => false,
                ]
            );

            if (!$user->hasRole('editor')) {
                $user->assignRole('editor');
            }
        }
    }

    /**
     * Create viewer test users.
     */
    private function createViewerUsers(): void
    {
        $viewerUsers = [
            [
                'name' => 'Viewer User',
                'email' => 'viewer@test.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Guest User',
                'email' => 'guest@test.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Read Only User',
                'email' => 'readonly@test.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Observer User',
                'email' => 'observer@test.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
        ];

        foreach ($viewerUsers as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make($userData['password']),
                    'email_verified_at' => $userData['email_verified_at'],
                    'social_provider' => null,
                    'social_id' => null,
                    'is_social_user' => false,
                ]
            );

            if (!$user->hasRole('viewer')) {
                $user->assignRole('viewer');
            }
        }
    }

    /**
     * Create users with multiple roles for testing role combinations.
     */
    private function createMultiRoleUsers(): void
    {
        $multiRoleUsers = [
            [
                'name' => 'Admin Editor',
                'email' => 'admineditor@test.com',
                'password' => 'password',
                'email_verified_at' => now(),
                'roles' => ['admin', 'editor'],
            ],
            [
                'name' => 'Editor Viewer',
                'email' => 'editorviewer@test.com',
                'password' => 'password',
                'email_verified_at' => now(),
                'roles' => ['editor', 'viewer'],
            ],
            [
                'name' => 'Power User',
                'email' => 'poweruser@test.com',
                'password' => 'password',
                'email_verified_at' => now(),
                'roles' => ['admin', 'editor', 'viewer'],
            ],
        ];

        foreach ($multiRoleUsers as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make($userData['password']),
                    'email_verified_at' => $userData['email_verified_at'],
                    'social_provider' => null,
                    'social_id' => null,
                    'is_social_user' => false,
                ]
            );

            // Assign all roles for this user
            foreach ($userData['roles'] as $role) {
                if (!$user->hasRole($role)) {
                    $user->assignRole($role);
                }
            }
        }
    }
}

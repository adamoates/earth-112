<?php

namespace Database\Seeders;

use App\Models\Invitation;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create permissions (only if they don't exist)
        $permissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view access requests',
            'approve access requests',
            'reject access requests',
            'create invitations',
            'view invitations',
            'delete invitations',
            'view analytics',
            'manage settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles (only if they don't exist)
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $editorRole = Role::firstOrCreate(['name' => 'editor']);
        $viewerRole = Role::firstOrCreate(['name' => 'viewer']);

        // Assign permissions to roles
        $adminRole->givePermissionTo(Permission::all());

        $editorRole->givePermissionTo([
            'view users',
            'view access requests',
            'approve access requests',
            'reject access requests',
            'create invitations',
            'view invitations',
            'view analytics',
        ]);

        $viewerRole->givePermissionTo([
            'view analytics',
        ]);

        // Create a default admin user (only if it doesn't exist)
        $admin = User::firstOrCreate(
            ['email' => 'admin@earth-112.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('Welcome#1'),
                'email_verified_at' => now(),
            ]
        );

        if (! $admin->hasRole('admin')) {
            $admin->assignRole('admin');
        }

        // Add a second default admin user (apmo1984@gmail.com)
        $admin2 = User::firstOrCreate(
            ['email' => 'apmo1984@gmail.com'],
            [
                'name' => 'Adam Oates',
                'password' => bcrypt('ZoeOates@2014!'),
                'email_verified_at' => now(),
            ]
        );

        if (! $admin2->hasRole('admin')) {
            $admin2->assignRole('admin');
        }

        // Create sample invitations (only if they don't exist)
        $invitations = [
            [
                'email' => 'editor@example.com',
                'role' => 'editor',
                'expires_at' => now()->addDays(7),
            ],
            [
                'email' => 'viewer@example.com',
                'role' => 'viewer',
                'expires_at' => now()->addDays(14),
            ],
        ];

        foreach ($invitations as $invitationData) {
            Invitation::firstOrCreate(
                ['email' => $invitationData['email']],
                array_merge($invitationData, [
                    'token' => Invitation::generateToken(),
                    'created_by' => $admin->id,
                ])
            );
        }
    }
}

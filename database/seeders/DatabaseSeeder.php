<?php

namespace Database\Seeders;

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
        // Create permissions
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
            Permission::create(['name' => $permission]);
        }

        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $editorRole = Role::create(['name' => 'editor']);
        $viewerRole = Role::create(['name' => 'viewer']);

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

        // Create a default admin user
        $admin = \App\Models\User::create([
            'name' => 'Admin User',
            'email' => 'admin@earth-112.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('admin');
    }
}

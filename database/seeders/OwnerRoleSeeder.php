<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class OwnerRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create owner role
        $ownerRole = Role::firstOrCreate(['name' => 'owner']);

        // Create permissions for auth settings management
        $permissions = [
            'manage_auth_settings',
            'view_auth_settings',
            'manage_users',
            'manage_invitations',
            'manage_access_requests',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Assign all permissions to owner role
        $ownerRole->givePermissionTo($permissions);

        // Also give owner role all admin permissions
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole) {
            $adminPermissions = $adminRole->permissions;
            $ownerRole->givePermissionTo($adminPermissions);
        }

        $this->command->info('Owner role and permissions created successfully!');
        $this->command->info('To assign owner role to a user, run: php artisan tinker');
        $this->command->info('Then: $user = User::find(1); $user->assignRole("owner");');
    }
}

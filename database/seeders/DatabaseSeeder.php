<?php

namespace Database\Seeders;

use App\Models\Invitation;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed admin users first
        $this->call(AdminUserSeeder::class);

        // Create permissions
        $permissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view invitations',
            'create invitations',
            'edit invitations',
            'delete invitations',
            'view access requests',
            'approve access requests',
            'reject access requests',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        $editorRole = Role::firstOrCreate(['name' => 'editor']);
        $editorRole->givePermissionTo([
            'view users',
            'view invitations',
            'create invitations',
            'view access requests',
            'approve access requests',
            'reject access requests',
        ]);

        $viewerRole = Role::firstOrCreate(['name' => 'viewer']);
        $viewerRole->givePermissionTo([
            'view users',
            'view invitations',
        ]);

        // Fetch the admin user for use in invitations
        $admin = User::where('email', 'admin@earth-112.com')->first();

        // Create sample invitations
        $invitations = [
            [
                'email' => 'test1@example.com',
                'role' => 'editor',
                'expires_at' => now()->addDays(7),
            ],
            [
                'email' => 'test2@example.com',
                'role' => 'viewer',
                'expires_at' => now()->addDays(14),
            ],
            [
                'email' => 'test3@example.com',
                'role' => 'admin',
                'expires_at' => now()->addDays(30),
            ],
        ];

        foreach ($invitations as $invitationData) {
            Invitation::firstOrCreate(
                ['email' => $invitationData['email']],
                array_merge($invitationData, [
                    'token' => Invitation::generateToken(),
                    'created_by' => $admin ? $admin->id : null, // Ensure $admin is not null
                ])
            );
        }

        // Seed test users (controlled by SEED_TEST_USERS environment variable)
        $this->call(RoleTestUsersSeeder::class);
    }
}

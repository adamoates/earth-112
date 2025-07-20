<?php

namespace Database\Seeders;

use App\Models\Invitation;
use Illuminate\Database\Seeder;

class InvitationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some sample invitations
        Invitation::createInvitation([
            'email' => 'test@example.com',
            'name' => 'Test User',
            'role' => 'user',
        ]);

        Invitation::createInvitation([
            'email' => 'admin@example.com',
            'name' => 'Admin User',
            'role' => 'admin',
        ]);

        // Create some open invitations (no email specified)
        Invitation::createInvitation([
            'role' => 'user',
        ]);

        Invitation::createInvitation([
            'role' => 'user',
        ]);

        $this->command->info('Sample invitations created successfully!');
        $this->command->info('Check the invitations table for the generated codes.');
    }
}

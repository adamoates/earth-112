<?php

namespace App\Console\Commands;

use App\Models\Invitation;
use Illuminate\Console\Command;

class CreateInvitation extends Command
{
    protected $signature = 'invitation:create {email} {--role=viewer} {--expires=7}';

    protected $description = 'Create an invitation for a specific email address';

    public function handle()
    {
        $email = $this->argument('email');
        $role = $this->option('role');
        $expiresInDays = (int) $this->option('expires');

        // Check if invitation already exists
        $existingInvitation = Invitation::where('email', $email)->first();

        if ($existingInvitation) {
            if ($existingInvitation->isUsed()) {
                $this->error("Invitation for {$email} has already been used.");
                return 1;
            }

            if ($existingInvitation->isExpired()) {
                $this->warn("Invitation for {$email} has expired. Creating a new one.");
                $existingInvitation->delete();
            } else {
                $this->info("Invitation for {$email} already exists and is valid.");
                $this->table(
                    ['Email', 'Role', 'Expires', 'Used'],
                    [[$existingInvitation->email, $existingInvitation->role, $existingInvitation->expires_at, $existingInvitation->used_at ? 'Yes' : 'No']]
                );
                return 0;
            }
        }

        // Create new invitation
        $invitation = Invitation::create([
            'email' => $email,
            'token' => Invitation::generateToken(),
            'role' => $role,
            'expires_at' => now()->addDays($expiresInDays),
            'used_at' => null,
        ]);

        $this->info("Invitation created successfully for {$email}!");
        $this->table(
            ['Email', 'Role', 'Expires', 'Token'],
            [[$invitation->email, $invitation->role, $invitation->expires_at, $invitation->token]]
        );

        return 0;
    }
}

<?php

namespace App\Console\Commands;

use App\Models\Invitation;
use Illuminate\Console\Command;

class CheckInvitations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invitations:check {email?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check invitations for an email or list all invitations';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');

        if ($email) {
            $this->checkSpecificEmail($email);
        } else {
            $this->listAllInvitations();
        }

        return 0;
    }

    private function checkSpecificEmail(string $email): void
    {
        $this->info("🔍 Checking invitations for: {$email}");

        $invitations = Invitation::where('email', $email)->get();

        if ($invitations->isEmpty()) {
            $this->error("❌ No invitations found for {$email}");
            $this->info("💡 Create an invitation with: php artisan invitation:create {$email} --role=admin");
            return;
        }

        $this->info("✅ Found " . $invitations->count() . " invitation(s):");

        foreach ($invitations as $invitation) {
            $status = $this->getInvitationStatus($invitation);
            $this->info("📧 Email: {$invitation->email}");
            $this->info("🎭 Role: {$invitation->role}");
            $this->info("📅 Expires: {$invitation->expires_at}");
            $this->info("✅ Used: " . ($invitation->used_at ? 'Yes' : 'No'));
            $this->info("📊 Status: {$status}");
            $this->info("---");
        }
    }

    private function listAllInvitations(): void
    {
        $this->info("📋 All Invitations:");

        $invitations = Invitation::orderBy('created_at', 'desc')->get();

        if ($invitations->isEmpty()) {
            $this->info("No invitations found.");
            return;
        }

        $headers = ['Email', 'Role', 'Expires', 'Used', 'Status'];
        $rows = [];

        foreach ($invitations as $invitation) {
            $status = $this->getInvitationStatus($invitation);
            $rows[] = [
                $invitation->email,
                $invitation->role,
                $invitation->expires_at->format('Y-m-d H:i'),
                $invitation->used_at ? 'Yes' : 'No',
                $status
            ];
        }

        $this->table($headers, $rows);
    }

    private function getInvitationStatus(Invitation $invitation): string
    {
        if ($invitation->used_at) {
            return 'Used';
        }

        if ($invitation->expires_at->isPast()) {
            return 'Expired';
        }

        return 'Valid';
    }
}

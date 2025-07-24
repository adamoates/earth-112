<?php

namespace App\Console\Commands;

use App\Models\Invitation;
use App\Notifications\InviteUserNotification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class TestInvitationEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:invitation-email {email} {--role=viewer}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test invitation email sending';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $role = $this->option('role');

        $this->info("Testing invitation email to: {$email} with role: {$role}");

        try {
            // Create invitation
            $invitation = Invitation::create([
                'email' => $email,
                'token' => Invitation::generateToken(),
                'role' => $role,
                'expires_at' => now()->addHours(48),
                'created_by' => 1,
            ]);

            $this->info("Invitation created with ID: {$invitation->id}");

            // Send email
            $this->info("Sending invitation email...");
            $invitation->notify(new InviteUserNotification($invitation));

            $this->info("✅ Invitation email sent successfully!");
            $this->info("Invitation URL: " . route('invitations.accept', $invitation->token));
            $this->info("Token: {$invitation->token}");

            // Log the test
            Log::info('Test invitation email sent', [
                'invitation_id' => $invitation->id,
                'email' => $email,
                'role' => $role,
                'token' => $invitation->token,
            ]);
        } catch (\Exception $e) {
            $this->error("❌ Failed to send invitation email: " . $e->getMessage());
            $this->error("Error details: " . $e->getTraceAsString());

            Log::error('Test invitation email failed', [
                'email' => $email,
                'role' => $role,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }
}

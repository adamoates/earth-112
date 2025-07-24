<?php

namespace App\Console\Commands;

use App\Models\Invitation;
use Illuminate\Console\Command;

class DebugInvitation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invitation:debug {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Debug invitation validation logic for a specific email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');

        $this->info("🔍 Debugging invitation validation for: {$email}");
        $this->info("⏰ Current time: " . now());
        $this->info("⏰ Current time (UTC): " . now()->utc());

        // Get all invitations for this email
        $allInvitations = Invitation::where('email', $email)->get();

        if ($allInvitations->isEmpty()) {
            $this->error("❌ No invitations found for {$email}");
            return 1;
        }

        $this->info("📋 Found " . $allInvitations->count() . " invitation(s):");

        foreach ($allInvitations as $invitation) {
            $this->info("--- Invitation ID: {$invitation->id} ---");
            $this->info("📧 Email: {$invitation->email}");
            $this->info("🎭 Role: {$invitation->role}");
            $this->info("📅 Expires: {$invitation->expires_at}");
            $this->info("✅ Used: " . ($invitation->used_at ? 'Yes' : 'No'));
            $this->info("⏰ Used at: " . ($invitation->used_at ?: 'Not used'));

            // Test each condition
            $isNotExpired = $invitation->expires_at > now();
            $isNotUsed = is_null($invitation->used_at);

            $this->info("🔍 Validation checks:");
            $this->info("   - Not expired: " . ($isNotExpired ? '✅ Yes' : '❌ No'));
            $this->info("   - Not used: " . ($isNotUsed ? '✅ Yes' : '❌ No'));
            $this->info("   - Valid: " . ($isNotExpired && $isNotUsed ? '✅ Yes' : '❌ No'));

            if (!$isNotExpired) {
                $this->warn("   ⚠️ Expired " . now()->diffForHumans($invitation->expires_at) . " ago");
            }

            if (!$isNotUsed) {
                $this->warn("   ⚠️ Used " . now()->diffForHumans($invitation->used_at) . " ago");
            }
        }

        // Test the exact query from SocialiteController
        $this->info("\n🔍 Testing exact SocialiteController query:");

        $validInvitation = Invitation::where('email', $email)
            ->where('expires_at', '>', now())
            ->whereNull('used_at')
            ->first();

        if ($validInvitation) {
            $this->info("✅ Valid invitation found: ID {$validInvitation->id}");
        } else {
            $this->error("❌ No valid invitation found with exact query");

            // Check what's wrong
            $invitation = Invitation::where('email', $email)->first();
            if ($invitation) {
                $this->info("🔍 Closest match:");
                $this->info("   - Expires: {$invitation->expires_at}");
                $this->info("   - Used: " . ($invitation->used_at ? 'Yes' : 'No'));
                $this->info("   - Current time: " . now());
                $this->info("   - Expired check: " . ($invitation->expires_at > now() ? 'Valid' : 'Expired'));
                $this->info("   - Used check: " . (is_null($invitation->used_at) ? 'Not used' : 'Used'));
            }
        }

        return 0;
    }
}

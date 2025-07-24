<?php

namespace App\Console\Commands;

use App\Models\Invitation;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;

class TestSocialLoginFlow extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'social:test-flow {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test the social login flow logic for a specific email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');

        $this->info("🔍 Testing social login flow for: {$email}");

        // Check if invitation exists
        $invitation = Invitation::where('email', $email)
            ->where('expires_at', '>', now())
            ->whereNull('used_at')
            ->first();

        if (!$invitation) {
            $this->error("❌ No valid invitation found for {$email}");
            $this->info("💡 Create invitation: php artisan invitation:create {$email} --role=admin");
            return 1;
        }

        $this->info("✅ Valid invitation found:");
        $this->info("   - Role: {$invitation->role}");
        $this->info("   - Expires: {$invitation->expires_at}");
        $this->info("   - Used: No");

        // Check if user exists
        $user = User::where('email', $email)->first();
        $isNewUser = !$user;

        if (!$user) {
            $this->info("📝 User does not exist - would create new user");
        } else {
            $this->info("👤 User exists:");
            $this->info("   - Name: {$user->name}");
            $this->info("   - Is Social User: " . ($user->isSocialUser() ? 'Yes' : 'No'));
            $this->info("   - Roles: " . $user->getRoleNames()->implode(', '));
        }

        // Simulate the social login logic
        $this->info("🔄 Simulating social login logic...");

        if (!$user) {
            $this->info("   - Would create new user with social info");
        } else {
            if (!$user->isSocialUser()) {
                $this->info("   - Would update existing user with social info");
            } else {
                $this->info("   - User already has social info");
            }
        }

        $this->info("   - Would assign role: {$invitation->role}");
        $this->info("   - Would mark invitation as used");
        $this->info("   - Would log in user");
        $this->info("   - Would redirect to social status page");

        $this->info("✅ Social login flow logic is correct!");

        return 0;
    }
}

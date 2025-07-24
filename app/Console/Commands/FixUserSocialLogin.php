<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class FixUserSocialLogin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:fix-social {email} {--provider=google} {--social-id=12345}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix a user\'s social login status for testing';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $provider = $this->option('provider');
        $socialId = $this->option('social-id');

        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error("❌ User not found: {$email}");
            return 1;
        }

        $this->info("🔍 Found user: {$user->name} ({$user->email})");
        $this->info("📊 Current status:");
        $this->info("   - Social Provider: " . ($user->social_provider ?: 'None'));
        $this->info("   - Social ID: " . ($user->social_id ?: 'None'));
        $this->info("   - Is Social User: " . ($user->is_social_user ? 'Yes' : 'No'));
        $this->info("   - Roles: " . $user->getRoleNames()->implode(', '));

        // Update user with social login info
        $user->update([
            'social_provider' => $provider,
            'social_id' => $socialId,
            'is_social_user' => true,
        ]);

        $this->info("✅ Updated user with social login info:");
        $this->info("   - Social Provider: {$provider}");
        $this->info("   - Social ID: {$socialId}");
        $this->info("   - Is Social User: Yes");

        $this->info("🎯 User can now login with both email/password AND social login!");

        return 0;
    }
}

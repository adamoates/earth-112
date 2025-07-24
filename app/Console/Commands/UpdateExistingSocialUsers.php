<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class UpdateExistingSocialUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:update-social-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update existing social login users with new social fields';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Updating existing social login users...');

        // Find users with random 64-character passwords (typical for social login)
        $users = User::whereRaw('LENGTH(password) > 60')->get();

        $updatedCount = 0;

        foreach ($users as $user) {
            // Check if this looks like a social login user (random password)
            if ($this->isLikelySocialUser($user)) {
                $user->update([
                    'social_provider' => 'google', // Default to Google for existing users
                    'social_id' => null, // We don't have this for existing users
                    'is_social_user' => true,
                ]);

                $updatedCount++;
                $this->line("Updated user: {$user->email}");
            }
        }

        $this->info("Updated {$updatedCount} users as social login users.");

        return 0;
    }

    /**
     * Check if user is likely a social login user based on password characteristics.
     */
    private function isLikelySocialUser(User $user): bool
    {
        // Skip if already marked as social user
        if ($user->is_social_user) {
            return false;
        }

        // Check if password is a random 64-character string (typical for social login)
        // This is a heuristic - social login users get Hash::make(Str::random(64))
        return strlen($user->password) > 60;
    }
}

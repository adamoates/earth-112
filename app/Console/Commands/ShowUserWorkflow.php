<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\Invitation;
use Illuminate\Console\Command;

class ShowUserWorkflow extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:workflow';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Show current user workflow status and available invitation codes';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔐 Earth-112 User Workflow Status');
        $this->info('=====================================');

        // User Statistics
        $totalUsers = User::count();
        $adminUsers = User::where('role', 'admin')->count();
        $regularUsers = User::where('role', 'user')->count();

        $this->info("\n👥 User Statistics:");
        $this->info("   Total Users: {$totalUsers}");
        $this->info("   Administrators: {$adminUsers}");
        $this->info("   Regular Users: {$regularUsers}");

        // Invitation Statistics
        $totalInvitations = Invitation::count();
        $activeInvitations = Invitation::where('is_used', false)->count();
        $usedInvitations = Invitation::where('is_used', true)->count();

        $this->info("\n📧 Invitation Statistics:");
        $this->info("   Total Invitations: {$totalInvitations}");
        $this->info("   Active Invitations: {$activeInvitations}");
        $this->info("   Used Invitations: {$usedInvitations}");

        // Available Invitation Codes
        $availableInvitations = Invitation::where('is_used', false)->get();

        if ($availableInvitations->count() > 0) {
            $this->info("\n🎫 Available Invitation Codes:");
            foreach ($availableInvitations as $invitation) {
                $email = $invitation->email ?: 'Open';
                $expires = $invitation->expires_at ? $invitation->expires_at->format('Y-m-d') : 'Never';
                $this->info("   {$invitation->code} - {$email} ({$invitation->role}) - Expires: {$expires}");
            }
        } else {
            $this->info("\n❌ No available invitation codes");
        }

        // Workflow Summary
        $this->info("\n🔄 User Workflow:");
        $this->info("   1. Admin creates invitation codes");
        $this->info("   2. Admin shares codes with intended users");
        $this->info("   3. Users register with invitation codes");
        $this->info("   4. Admin manages users via User Management");

        $this->info("\n📋 Quick Commands:");
        $this->info("   php artisan invitation:create --email=user@example.com --role=user");
        $this->info("   php artisan users:workflow");
        $this->info("   php artisan email:test user@example.com");

        return 0;
    }
}

<?php

namespace App\Console\Commands;

use App\Models\Invitation;
use Illuminate\Console\Command;

class CreateInvitation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invitation:create 
                            {--email= : Email address for the invitation}
                            {--name= : Name for the invitation}
                            {--role=user : Role (user or admin)}
                            {--expires= : Expiration date (YYYY-MM-DD HH:MM:SS)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new invitation code';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->option('email');
        $name = $this->option('name');
        $role = $this->option('role');
        $expires = $this->option('expires');

        if (!in_array($role, ['user', 'admin'])) {
            $this->error('Role must be either "user" or "admin"');
            return 1;
        }

        $data = [
            'role' => $role,
        ];

        if ($email) {
            $data['email'] = $email;
        }

        if ($name) {
            $data['name'] = $name;
        }

        if ($expires) {
            $data['expires_at'] = $expires;
        }

        $invitation = Invitation::createInvitation($data);

        $this->info('✅ Invitation created successfully!');
        $this->info("📧 Code: {$invitation->code}");
        $this->info("👤 Role: {$invitation->role}");

        if ($invitation->email) {
            $this->info("📮 Email: {$invitation->email}");
        } else {
            $this->info("📮 Email: Open invitation");
        }

        if ($invitation->expires_at) {
            $this->info("⏰ Expires: {$invitation->expires_at}");
        } else {
            $this->info("⏰ Expires: Never");
        }

        return 0;
    }
}

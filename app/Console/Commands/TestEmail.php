<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:test {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a test email to verify email configuration';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');

        try {
            Mail::raw('This is a test email from Earth-112! 

If you received this email, your email configuration is working correctly.

Best regards,
Earth-112 Team', function ($message) use ($email) {
                $message->to($email)
                    ->subject('Earth-112 Test Email');
            });

            $this->info("✅ Test email sent successfully to {$email}");
            $this->info("📧 Check your inbox (and spam folder) for the test email.");
        } catch (\Exception $e) {
            $this->error("❌ Failed to send email: " . $e->getMessage());
            $this->info("🔧 Please check your email configuration in .env file");
            $this->info("📖 See EMAIL_SETUP.md for configuration help");
        }
    }
}

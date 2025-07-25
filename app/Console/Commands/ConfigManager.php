<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Config\SocialAuth;
use App\Config\AwsConfig;

class ConfigManager extends Command
{
    protected $signature = 'config:validate {--provider= : Validate specific provider} {--aws : Validate AWS configuration}';
    protected $description = 'Validate and manage configuration settings';

    public function handle()
    {
        $provider = $this->option('provider');
        $aws = $this->option('aws');

        if ($aws) {
            $this->validateAws();
            return;
        }

        if ($provider) {
            $this->validateProvider($provider);
            return;
        }

        $this->validateAll();
    }

    private function validateAll()
    {
        $this->info('=== Configuration Validation ===');
        $this->newLine();

        // Validate Social Auth
        $this->info('Social Authentication:');
        $this->line('----------------------');
        $providers = SocialAuth::getProviders();

        foreach ($providers as $name => $config) {
            $status = $config['enabled'] ? '✅ Enabled' : '❌ Disabled';
            $this->line("$name: $status");

            if ($config['enabled']) {
                $validation = SocialAuth::validateProvider($name);
                if ($validation['valid']) {
                    $this->line("  ✅ Configuration valid");
                } else {
                    $this->line("  ❌ Configuration errors:");
                    foreach ($validation['errors'] as $error) {
                        $this->line("    - $error");
                    }
                }
            }
        }

        $this->newLine();

        // Validate AWS
        $this->info('AWS Configuration:');
        $this->line('------------------');
        if (AwsConfig::isConfigured()) {
            $validation = AwsConfig::validate();
            if ($validation['valid']) {
                $this->line('✅ AWS configuration valid');
            } else {
                $this->line('❌ AWS configuration errors:');
                foreach ($validation['errors'] as $error) {
                    $this->line("  - $error");
                }
            }
        } else {
            $this->line('⚠️  AWS not configured');
        }
    }

    private function validateProvider(string $provider)
    {
        $this->info("Validating $provider configuration...");

        $validation = SocialAuth::validateProvider($provider);

        if ($validation['valid']) {
            $this->info("✅ $provider configuration is valid");
        } else {
            $this->error("❌ $provider configuration has errors:");
            foreach ($validation['errors'] as $error) {
                $this->line("  - $error");
            }
        }
    }

    private function validateAws()
    {
        $this->info('Validating AWS configuration...');

        if (!AwsConfig::isConfigured()) {
            $this->warn('⚠️  AWS is not configured');
            return;
        }

        $validation = AwsConfig::validate();

        if ($validation['valid']) {
            $this->info('✅ AWS configuration is valid');
            $config = AwsConfig::getConfig();
            $this->line("  Region: {$config['region']}");
            $this->line("  Bucket: {$config['bucket']}");
        } else {
            $this->error('❌ AWS configuration has errors:');
            foreach ($validation['errors'] as $error) {
                $this->line("  - $error");
            }
        }
    }
}

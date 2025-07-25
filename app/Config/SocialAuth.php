<?php

namespace App\Config;

use Illuminate\Support\Facades\Validator;

class SocialAuth
{
    public static function getProviders(): array
    {
        return [
            'google' => [
                'enabled' => env('GOOGLE_AUTH_ENABLED', false),
                'client_id' => env('GOOGLE_CLIENT_ID'),
                'client_secret' => env('GOOGLE_CLIENT_SECRET'),
                'redirect_uri' => env('GOOGLE_REDIRECT_URI'),
                'scopes' => ['email', 'profile'],
            ],
            'github' => [
                'enabled' => env('GITHUB_AUTH_ENABLED', false),
                'client_id' => env('GITHUB_CLIENT_ID'),
                'client_secret' => env('GITHUB_CLIENT_SECRET'),
                'redirect_uri' => env('GITHUB_REDIRECT_URI'),
                'scopes' => ['user:email'],
            ],
            'discord' => [
                'enabled' => env('DISCORD_AUTH_ENABLED', false),
                'client_id' => env('DISCORD_CLIENT_ID'),
                'client_secret' => env('DISCORD_CLIENT_SECRET'),
                'redirect_uri' => env('DISCORD_REDIRECT_URI'),
                'scopes' => ['email', 'identify'],
            ],
        ];
    }

    public static function getProvider(string $provider): ?array
    {
        $providers = self::getProviders();
        return $providers[$provider] ?? null;
    }

    public static function isProviderEnabled(string $provider): bool
    {
        $providerConfig = self::getProvider($provider);
        return $providerConfig && $providerConfig['enabled'];
    }

    public static function getEnabledProviders(): array
    {
        return array_filter(self::getProviders(), fn($config) => $config['enabled']);
    }

    public static function validateProvider(string $provider): array
    {
        $providerConfig = self::getProvider($provider);

        if (!$providerConfig) {
            return ['valid' => false, 'errors' => ['Provider not found']];
        }

        $validator = Validator::make($providerConfig, [
            'client_id' => 'required|string',
            'client_secret' => 'required|string',
            'redirect_uri' => 'required|url',
        ]);

        return [
            'valid' => !$validator->fails(),
            'errors' => $validator->errors()->all(),
        ];
    }

    public static function validateAllProviders(): array
    {
        $results = [];
        foreach (array_keys(self::getProviders()) as $provider) {
            $results[$provider] = self::validateProvider($provider);
        }
        return $results;
    }
}

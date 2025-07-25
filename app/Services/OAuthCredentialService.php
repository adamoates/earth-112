<?php

namespace App\Services;

use App\Models\OAuthCredential;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cache;

class OAuthCredentialService
{
    /**
     * Update or create OAuth credentials for a provider
     */
    public function updateCredentials(string $provider, array $data): OAuthCredential
    {
        $credential = OAuthCredential::updateOrCreate(
            ['provider' => $provider],
            [
                'client_id' => $data['client_id'] ?? null,
                'client_secret' => $data['client_secret'] ?? null,
                'redirect_uri' => $data['redirect_uri'] ?? OAuthCredential::getDefaultRedirectUri($provider),
                'scopes' => $data['scopes'] ?? OAuthCredential::getDefaultScopes($provider),
                'is_active' => $data['is_active'] ?? false,
            ]
        );

        // Clear cache when credentials are updated
        $this->clearCache($provider);

        return $credential;
    }

    /**
     * Get credentials for a provider
     */
    public function getCredentials(string $provider): ?OAuthCredential
    {
        return Cache::remember("oauth_credentials_{$provider}", 300, function () use ($provider) {
            return OAuthCredential::getForProvider($provider);
        });
    }

    /**
     * Get all active credentials
     */
    public function getAllActiveCredentials(): \Illuminate\Database\Eloquent\Collection
    {
        return Cache::remember('oauth_credentials_all', 300, function () {
            return OAuthCredential::getActive();
        });
    }

    /**
     * Check if a provider has valid credentials
     */
    public function hasValidCredentials(string $provider): bool
    {
        return Cache::remember("oauth_credentials_valid_{$provider}", 300, function () use ($provider) {
            return OAuthCredential::hasValidCredentials($provider);
        });
    }

    /**
     * Get credentials as config array for Laravel Socialite
     */
    public function getConfigForProvider(string $provider): ?array
    {
        $credential = $this->getCredentials($provider);

        if (!$credential || !$credential->is_active) {
            return null;
        }

        return [
            'client_id' => $credential->client_id,
            'client_secret' => $credential->client_secret,
            'redirect' => $credential->redirect_uri,
        ];
    }

    /**
     * Update Laravel's config with OAuth credentials
     */
    public function updateConfig(): void
    {
        $providers = ['google', 'github', 'discord'];

        foreach ($providers as $provider) {
            $config = $this->getConfigForProvider($provider);

            if ($config) {
                Config::set("services.{$provider}", $config);
            }
        }
    }

    /**
     * Clear cache for a specific provider
     */
    public function clearCache(string $provider): void
    {
        Cache::forget("oauth_credentials_{$provider}");
        Cache::forget("oauth_credentials_valid_{$provider}");
        Cache::forget('oauth_credentials_all');
    }

    /**
     * Clear all OAuth credential caches
     */
    public function clearAllCache(): void
    {
        $providers = ['google', 'github', 'discord'];

        foreach ($providers as $provider) {
            $this->clearCache($provider);
        }
    }

    /**
     * Validate credentials for a provider
     */
    public function validateCredentials(string $provider, array $data): array
    {
        $errors = [];

        if (empty($data['client_id'])) {
            $errors[] = 'Client ID is required';
        }

        if (empty($data['client_secret'])) {
            $errors[] = 'Client Secret is required';
        }

        if (!empty($data['redirect_uri']) && !filter_var($data['redirect_uri'], FILTER_VALIDATE_URL)) {
            $errors[] = 'Redirect URI must be a valid URL';
        }

        return [
            'valid' => empty($errors),
            'errors' => $errors,
        ];
    }

    /**
     * Get provider display information
     */
    public function getProviderInfo(string $provider): array
    {
        return match ($provider) {
            'google' => [
                'name' => 'Google',
                'description' => 'Google OAuth 2.0',
                'setup_url' => 'https://console.developers.google.com/',
                'docs_url' => 'https://developers.google.com/identity/protocols/oauth2',
            ],
            'github' => [
                'name' => 'GitHub',
                'description' => 'GitHub OAuth App',
                'setup_url' => 'https://github.com/settings/developers',
                'docs_url' => 'https://docs.github.com/en/apps/oauth-apps',
            ],
            'discord' => [
                'name' => 'Discord',
                'description' => 'Discord OAuth2',
                'setup_url' => 'https://discord.com/developers/applications',
                'docs_url' => 'https://discord.com/developers/docs/topics/oauth2',
            ],
            default => [
                'name' => ucfirst($provider),
                'description' => 'OAuth 2.0 Provider',
                'setup_url' => null,
                'docs_url' => null,
            ],
        };
    }
}

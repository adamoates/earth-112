<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Encryption\Encrypter;

class OAuthCredential extends Model
{
    use HasFactory;

    protected $fillable = [
        'provider',
        'client_id',
        'client_secret',
        'redirect_uri',
        'scopes',
        'is_active',
    ];

    protected $casts = [
        'scopes' => 'array',
        'is_active' => 'boolean',
    ];

    protected $hidden = [
        'client_secret',
    ];

    /**
     * Get the client secret (decrypted)
     */
    public function getClientSecretAttribute($value)
    {
        if (!$value) {
            return null;
        }

        try {
            return decrypt($value);
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Set the client secret (encrypted)
     */
    public function setClientSecretAttribute($value)
    {
        if ($value) {
            $this->attributes['client_secret'] = encrypt($value);
        } else {
            $this->attributes['client_secret'] = null;
        }
    }

    /**
     * Get credentials for a specific provider
     */
    public static function getForProvider(string $provider): ?self
    {
        return static::where('provider', $provider)->first();
    }

    /**
     * Get active credentials for a specific provider
     */
    public static function getActiveForProvider(string $provider): ?self
    {
        return static::where('provider', $provider)
            ->where('is_active', true)
            ->first();
    }

    /**
     * Get all active credentials
     */
    public static function getActive(): \Illuminate\Database\Eloquent\Collection
    {
        return static::where('is_active', true)->get();
    }

    /**
     * Check if a provider has valid credentials
     */
    public static function hasValidCredentials(string $provider): bool
    {
        $credential = static::getForProvider($provider);

        if (!$credential) {
            return false;
        }

        return !empty($credential->client_id) && !empty($credential->client_secret);
    }

    /**
     * Get default scopes for a provider
     */
    public static function getDefaultScopes(string $provider): array
    {
        return match ($provider) {
            'google' => ['email', 'profile'],
            'github' => ['user:email'],
            'discord' => ['email', 'identify'],
            'linkedin' => ['r_emailaddress', 'r_liteprofile'],
            default => [],
        };
    }

    /**
     * Get default redirect URI for a provider
     */
    public static function getDefaultRedirectUri(string $provider): string
    {
        return route("social.callback", ['provider' => $provider]);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuthSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'google_auth_enabled',
        'github_auth_enabled',
        'discord_auth_enabled',
        'linkedin_auth_enabled',
        'invite_only_mode',
        'open_registration',
        // Security Controls
        'require_2fa_all_users',
        'require_2fa_admins_only',
        'session_timeout_minutes',
        'min_password_length',
        'require_password_complexity',
        'require_password_expiration',
        'password_expiration_days',
    ];

    protected $casts = [
        'google_auth_enabled' => 'boolean',
        'github_auth_enabled' => 'boolean',
        'discord_auth_enabled' => 'boolean',
        'linkedin_auth_enabled' => 'boolean',
        'invite_only_mode' => 'boolean',
        'open_registration' => 'boolean',
        // Security Controls
        'require_2fa_all_users' => 'boolean',
        'require_2fa_admins_only' => 'boolean',
        'session_timeout_minutes' => 'integer',
        'min_password_length' => 'integer',
        'require_password_complexity' => 'boolean',
        'require_password_expiration' => 'boolean',
        'password_expiration_days' => 'integer',
    ];

    /**
     * Get the current auth settings, creating default if none exist
     */
    public static function getCurrent(): self
    {
        return static::firstOrCreate([], [
            'google_auth_enabled' => true,
            'github_auth_enabled' => false,
            'discord_auth_enabled' => false,
            'linkedin_auth_enabled' => false,
            'invite_only_mode' => true,
            'open_registration' => false,
            // Security Controls - defaults
            'require_2fa_all_users' => false,
            'require_2fa_admins_only' => false,
            'session_timeout_minutes' => 60,
            'min_password_length' => 8,
            'require_password_complexity' => false,
            'require_password_expiration' => false,
            'password_expiration_days' => 90,
        ]);
    }

    /**
     * Check if any social auth is enabled
     */
    public function hasSocialAuth(): bool
    {
        return $this->google_auth_enabled || $this->github_auth_enabled || $this->discord_auth_enabled;
    }

    /**
     * Check if registration is allowed
     */
    public function isRegistrationAllowed(): bool
    {
        return $this->open_registration || !$this->invite_only_mode;
    }

    /**
     * Check if 2FA is required for a specific user role
     */
    public function is2FARequired(string $role = null): bool
    {
        if ($this->require_2fa_all_users) {
            return true;
        }

        if ($this->require_2fa_admins_only && in_array($role, ['admin', 'owner'])) {
            return true;
        }

        return false;
    }

    /**
     * Get session timeout in seconds
     */
    public function getSessionTimeoutSeconds(): int
    {
        return $this->session_timeout_minutes * 60;
    }

    /**
     * Check if a feature is enabled
     */
    public function isFeatureEnabled(string $feature): bool
    {
        return match ($feature) {
            'beta_dashboard' => $this->enable_beta_dashboard,
            'new_notifications' => $this->enable_new_notifications,
            'user_impersonation' => $this->enable_user_impersonation,
            'audit_log' => $this->enable_audit_log,
            'maintenance_mode' => $this->enable_maintenance_mode,
            default => false,
        };
    }
}

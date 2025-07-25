<?php

namespace App\Services;

use App\Models\AuthSetting;
use App\Config\SocialAuth;

class AuthSettingsService
{
    /**
     * Get the current auth settings
     */
    public static function getSettings(): AuthSetting
    {
        return AuthSetting::getCurrent();
    }

    /**
     * Check if Google auth is enabled
     */
    public static function isGoogleAuthEnabled(): bool
    {
        return self::getSettings()->google_auth_enabled && SocialAuth::isProviderEnabled('google');
    }

    /**
     * Check if GitHub auth is enabled
     */
    public static function isGitHubAuthEnabled(): bool
    {
        return self::getSettings()->github_auth_enabled && SocialAuth::isProviderEnabled('github');
    }

    /**
     * Check if Discord auth is enabled
     */
    public static function isDiscordAuthEnabled(): bool
    {
        return self::getSettings()->discord_auth_enabled && SocialAuth::isProviderEnabled('discord');
    }

    /**
     * Check if invite only mode is enabled
     */
    public static function isInviteOnlyMode(): bool
    {
        return self::getSettings()->invite_only_mode;
    }

    /**
     * Check if open registration is enabled
     */
    public static function isOpenRegistrationEnabled(): bool
    {
        return self::getSettings()->open_registration;
    }

    /**
     * Check if registration is allowed (either open registration or not invite-only)
     */
    public static function isRegistrationAllowed(): bool
    {
        $settings = self::getSettings();
        return $settings->open_registration || !$settings->invite_only_mode;
    }

    /**
     * Check if 2FA is required for a specific user role
     */
    public static function is2FARequired(string $role = null): bool
    {
        return self::getSettings()->is2FARequired($role);
    }

    /**
     * Get session timeout in seconds
     */
    public static function getSessionTimeoutSeconds(): int
    {
        return self::getSettings()->getSessionTimeoutSeconds();
    }

    /**
     * Get minimum password length
     */
    public static function getMinPasswordLength(): int
    {
        return self::getSettings()->min_password_length;
    }

    /**
     * Check if password complexity is required
     */
    public static function isPasswordComplexityRequired(): bool
    {
        return self::getSettings()->require_password_complexity;
    }

    /**
     * Check if password expiration is required
     */
    public static function isPasswordExpirationRequired(): bool
    {
        return self::getSettings()->require_password_expiration;
    }

    /**
     * Get password expiration days
     */
    public static function getPasswordExpirationDays(): int
    {
        return self::getSettings()->password_expiration_days;
    }

    /**
     * Check if a feature is enabled
     */
    public static function isFeatureEnabled(string $feature): bool
    {
        return self::getSettings()->isFeatureEnabled($feature);
    }

    /**
     * Check if maintenance mode is enabled
     */
    public static function isMaintenanceMode(): bool
    {
        return self::getSettings()->enable_maintenance_mode;
    }

    /**
     * Get maintenance message
     */
    public static function getMaintenanceMessage(): string
    {
        return self::getSettings()->maintenance_message ?? 'We are currently performing maintenance. Please check back soon.';
    }

    /**
     * Get all settings as an array for frontend
     */
    public static function getSettingsArray(): array
    {
        $settings = self::getSettings();
        return [
            // Authentication Providers
            'google_auth_enabled' => $settings->google_auth_enabled,
            'github_auth_enabled' => $settings->github_auth_enabled,
            'discord_auth_enabled' => $settings->discord_auth_enabled,
            'invite_only_mode' => $settings->invite_only_mode,
            'open_registration' => $settings->open_registration,

            // Security Controls
            'require_2fa_all_users' => $settings->require_2fa_all_users,
            'require_2fa_admins_only' => $settings->require_2fa_admins_only,
            'session_timeout_minutes' => $settings->session_timeout_minutes,
            'min_password_length' => $settings->min_password_length,
            'require_password_complexity' => $settings->require_password_complexity,
            'require_password_expiration' => $settings->require_password_expiration,
            'password_expiration_days' => $settings->password_expiration_days,

            // Feature Toggles
            'enable_beta_dashboard' => $settings->enable_beta_dashboard,
            'enable_new_notifications' => $settings->enable_new_notifications,
            'enable_user_impersonation' => $settings->enable_user_impersonation,
            'enable_audit_log' => $settings->enable_audit_log,
            'enable_maintenance_mode' => $settings->enable_maintenance_mode,
            'maintenance_message' => $settings->maintenance_message,
        ];
    }
}

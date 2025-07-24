<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuthSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthSettingsController extends Controller
{
    /**
     * Display the auth settings management page
     */
    public function index(): Response
    {
        // Check permission manually
        if (!Auth::user()->hasPermissionTo('manage_auth_settings')) {
            abort(403, 'Unauthorized action.');
        }

        $settings = AuthSetting::getCurrent();

        return Inertia::render('admin/auth-settings/index', [
            'settings' => [
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
            ],
        ]);
    }

    /**
     * Update the auth settings
     */
    public function update(Request $request)
    {
        // Check permission manually
        if (!Auth::user()->hasPermissionTo('manage_auth_settings')) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            // Authentication Providers
            'google_auth_enabled' => 'boolean',
            'github_auth_enabled' => 'boolean',
            'discord_auth_enabled' => 'boolean',
            'invite_only_mode' => 'boolean',
            'open_registration' => 'boolean',

            // Security Controls
            'require_2fa_all_users' => 'boolean',
            'require_2fa_admins_only' => 'boolean',
            'session_timeout_minutes' => 'integer|min:5|max:1440', // 5 minutes to 24 hours
            'min_password_length' => 'integer|min:6|max:50',
            'require_password_complexity' => 'boolean',
            'require_password_expiration' => 'boolean',
            'password_expiration_days' => 'integer|min:30|max:365',

            // Feature Toggles
            'enable_beta_dashboard' => 'boolean',
            'enable_new_notifications' => 'boolean',
            'enable_user_impersonation' => 'boolean',
            'enable_audit_log' => 'boolean',
            'enable_maintenance_mode' => 'boolean',
            'maintenance_message' => 'nullable|string|max:500',
        ]);

        $settings = AuthSetting::getCurrent();
        $settings->update($request->only([
            // Authentication Providers
            'google_auth_enabled',
            'github_auth_enabled',
            'discord_auth_enabled',
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

            // Feature Toggles
            'enable_beta_dashboard',
            'enable_new_notifications',
            'enable_user_impersonation',
            'enable_audit_log',
            'enable_maintenance_mode',
            'maintenance_message',
        ]));

        return back()->with('success', 'Auth settings updated successfully!');
    }
}

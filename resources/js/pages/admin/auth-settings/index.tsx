import { Head, useForm } from '@inertiajs/react';
import { Lock, Save, Settings, Shield, Zap } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Auth Settings',
        href: '/auth-settings',
    },
];

interface AuthSettings {
    // Authentication Providers
    google_auth_enabled: boolean;
    github_auth_enabled: boolean;
    discord_auth_enabled: boolean;
    invite_only_mode: boolean;
    open_registration: boolean;

    // Security Controls
    require_2fa_all_users: boolean;
    require_2fa_admins_only: boolean;
    session_timeout_minutes: number;
    min_password_length: number;
    require_password_complexity: boolean;
    require_password_expiration: boolean;
    password_expiration_days: number;

    // Feature Toggles
    enable_beta_dashboard: boolean;
    enable_new_notifications: boolean;
    enable_user_impersonation: boolean;
    enable_audit_log: boolean;
    enable_maintenance_mode: boolean;
    maintenance_message: string;
}

interface Props {
    settings: AuthSettings;
}

export default function AuthSettingsPage({ settings }: Props) {
    const { data, setData, patch, processing } = useForm<Record<string, boolean | number | string>>({
        // Authentication Providers
        google_auth_enabled: settings.google_auth_enabled,
        github_auth_enabled: settings.github_auth_enabled,
        discord_auth_enabled: settings.discord_auth_enabled,
        invite_only_mode: settings.invite_only_mode,
        open_registration: settings.open_registration,

        // Security Controls
        require_2fa_all_users: settings.require_2fa_all_users,
        require_2fa_admins_only: settings.require_2fa_admins_only,
        session_timeout_minutes: settings.session_timeout_minutes,
        min_password_length: settings.min_password_length,
        require_password_complexity: settings.require_password_complexity,
        require_password_expiration: settings.require_password_expiration,
        password_expiration_days: settings.password_expiration_days,

        // Feature Toggles
        enable_beta_dashboard: settings.enable_beta_dashboard,
        enable_new_notifications: settings.enable_new_notifications,
        enable_user_impersonation: settings.enable_user_impersonation,
        enable_audit_log: settings.enable_audit_log,
        enable_maintenance_mode: settings.enable_maintenance_mode,
        maintenance_message: settings.maintenance_message,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('auth-settings.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Auth Settings" />

            <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">Authentication Settings</h1>
                    <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                        Manage authentication providers, security controls, and feature toggles
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Social Authentication Providers */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Social Authentication Providers
                            </CardTitle>
                            <CardDescription>Enable or disable social login options for your users</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Google Auth */}
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label htmlFor="google_auth" className="text-base font-medium">
                                        Google Authentication
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow users to sign in with their Google accounts</p>
                                </div>
                                <Switch
                                    id="google_auth"
                                    checked={data.google_auth_enabled}
                                    onCheckedChange={(checked: boolean) => setData('google_auth_enabled', checked)}
                                />
                            </div>

                            {/* GitHub Auth */}
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label htmlFor="github_auth" className="text-base font-medium">
                                        GitHub Authentication
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow users to sign in with their GitHub accounts</p>
                                </div>
                                <Switch
                                    id="github_auth"
                                    checked={data.github_auth_enabled}
                                    onCheckedChange={(checked: boolean) => setData('github_auth_enabled', checked)}
                                />
                            </div>

                            {/* Discord Auth */}
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label htmlFor="discord_auth" className="text-base font-medium">
                                        Discord Authentication
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow users to sign in with their Discord accounts</p>
                                </div>
                                <Switch
                                    id="discord_auth"
                                    checked={data.discord_auth_enabled}
                                    onCheckedChange={(checked: boolean) => setData('discord_auth_enabled', checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Registration Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Registration Settings
                            </CardTitle>
                            <CardDescription>Control how users can register for your platform</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Invite Only Mode */}
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label htmlFor="invite_only" className="text-base font-medium">
                                        Invite Only Mode
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Require an invitation for all new user registrations</p>
                                </div>
                                <Switch
                                    id="invite_only"
                                    checked={data.invite_only_mode}
                                    onCheckedChange={(checked: boolean) => setData('invite_only_mode', checked)}
                                />
                            </div>

                            {/* Open Registration */}
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label htmlFor="open_registration" className="text-base font-medium">
                                        Open Registration
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow anyone to register without an invitation</p>
                                </div>
                                <Switch
                                    id="open_registration"
                                    checked={data.open_registration}
                                    onCheckedChange={(checked: boolean) => setData('open_registration', checked)}
                                />
                            </div>

                            {/* Warning Message */}
                            {data.invite_only_mode && data.open_registration && (
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                                    <p className="text-sm text-amber-800 dark:text-amber-200">
                                        <strong>Warning:</strong> You have both "Invite Only Mode" and "Open Registration" enabled. This may cause
                                        confusion. Consider disabling one of these options.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Security Controls */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5" />
                                Security Controls
                            </CardTitle>
                            <CardDescription>Configure security settings for your platform</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* 2FA Settings */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">Two-Factor Authentication</h4>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label htmlFor="require_2fa_all_users" className="text-base font-medium">
                                            Require 2FA for All Users
                                        </Label>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Force all users to set up two-factor authentication
                                        </p>
                                    </div>
                                    <Switch
                                        id="require_2fa_all_users"
                                        checked={data.require_2fa_all_users}
                                        onCheckedChange={(checked: boolean) => setData('require_2fa_all_users', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label htmlFor="require_2fa_admins_only" className="text-base font-medium">
                                            Require 2FA for Admins Only
                                        </Label>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Force only admin and owner users to set up 2FA</p>
                                    </div>
                                    <Switch
                                        id="require_2fa_admins_only"
                                        checked={data.require_2fa_admins_only}
                                        onCheckedChange={(checked: boolean) => setData('require_2fa_admins_only', checked)}
                                    />
                                </div>
                            </div>

                            {/* Session Timeout */}
                            <div className="space-y-2">
                                <Label htmlFor="session_timeout_minutes" className="text-base font-medium">
                                    Session Timeout (minutes)
                                </Label>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    How long before users are automatically logged out due to inactivity
                                </p>
                                <Input
                                    id="session_timeout_minutes"
                                    type="number"
                                    min="5"
                                    max="1440"
                                    value={data.session_timeout_minutes}
                                    onChange={(e) => setData('session_timeout_minutes', parseInt(e.target.value))}
                                    className="max-w-xs"
                                />
                            </div>

                            {/* Password Policy */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">Password Policy</h4>

                                <div className="space-y-2">
                                    <Label htmlFor="min_password_length" className="text-base font-medium">
                                        Minimum Password Length
                                    </Label>
                                    <Input
                                        id="min_password_length"
                                        type="number"
                                        min="6"
                                        max="50"
                                        value={data.min_password_length}
                                        onChange={(e) => setData('min_password_length', parseInt(e.target.value))}
                                        className="max-w-xs"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label htmlFor="require_password_complexity" className="text-base font-medium">
                                            Require Password Complexity
                                        </Label>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Require uppercase, lowercase, numbers, and symbols</p>
                                    </div>
                                    <Switch
                                        id="require_password_complexity"
                                        checked={data.require_password_complexity}
                                        onCheckedChange={(checked: boolean) => setData('require_password_complexity', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label htmlFor="require_password_expiration" className="text-base font-medium">
                                            Require Password Expiration
                                        </Label>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Force users to change their password periodically</p>
                                    </div>
                                    <Switch
                                        id="require_password_expiration"
                                        checked={data.require_password_expiration}
                                        onCheckedChange={(checked: boolean) => setData('require_password_expiration', checked)}
                                    />
                                </div>

                                {data.require_password_expiration && (
                                    <div className="space-y-2">
                                        <Label htmlFor="password_expiration_days" className="text-base font-medium">
                                            Password Expiration (days)
                                        </Label>
                                        <Input
                                            id="password_expiration_days"
                                            type="number"
                                            min="30"
                                            max="365"
                                            value={data.password_expiration_days}
                                            onChange={(e) => setData('password_expiration_days', parseInt(e.target.value))}
                                            className="max-w-xs"
                                        />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feature Toggles */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                Feature Toggles
                            </CardTitle>
                            <CardDescription>Enable or disable platform features</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label htmlFor="enable_beta_dashboard" className="text-base font-medium">
                                        Beta Dashboard
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Enable the new beta dashboard interface</p>
                                </div>
                                <Switch
                                    id="enable_beta_dashboard"
                                    checked={data.enable_beta_dashboard}
                                    onCheckedChange={(checked: boolean) => setData('enable_beta_dashboard', checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label htmlFor="enable_new_notifications" className="text-base font-medium">
                                        New Notifications System
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Enable the improved notification system</p>
                                </div>
                                <Switch
                                    id="enable_new_notifications"
                                    checked={data.enable_new_notifications}
                                    onCheckedChange={(checked: boolean) => setData('enable_new_notifications', checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label htmlFor="enable_user_impersonation" className="text-base font-medium">
                                        User Impersonation
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow admins to impersonate other users for support</p>
                                </div>
                                <Switch
                                    id="enable_user_impersonation"
                                    checked={data.enable_user_impersonation}
                                    onCheckedChange={(checked: boolean) => setData('enable_user_impersonation', checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label htmlFor="enable_audit_log" className="text-base font-medium">
                                        Audit Log
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Log all critical actions for security and compliance</p>
                                </div>
                                <Switch
                                    id="enable_audit_log"
                                    checked={data.enable_audit_log}
                                    onCheckedChange={(checked: boolean) => setData('enable_audit_log', checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label htmlFor="enable_maintenance_mode" className="text-base font-medium">
                                        Maintenance Mode
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Put the platform in maintenance mode</p>
                                </div>
                                <Switch
                                    id="enable_maintenance_mode"
                                    checked={data.enable_maintenance_mode}
                                    onCheckedChange={(checked: boolean) => setData('enable_maintenance_mode', checked)}
                                />
                            </div>

                            {data.enable_maintenance_mode && (
                                <div className="space-y-2">
                                    <Label htmlFor="maintenance_message" className="text-base font-medium">
                                        Maintenance Message
                                    </Label>
                                    <Textarea
                                        id="maintenance_message"
                                        value={data.maintenance_message}
                                        onChange={(e) => setData('maintenance_message', e.target.value)}
                                        placeholder="Enter a message to display during maintenance..."
                                        rows={3}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} className="h-10">
                            {processing ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Settings
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

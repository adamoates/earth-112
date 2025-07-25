import { Head, useForm } from '@inertiajs/react';
import { Lock, Save, Settings, Shield, Zap } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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

interface OAuthCredential {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    scopes: string[];
    is_active: boolean;
    has_valid_credentials: boolean;
    provider_info: {
        name: string;
        description: string;
        setup_url: string;
        docs_url: string;
    };
}

interface OAuthCredentials {
    google: OAuthCredential;
    github: OAuthCredential;
    discord: OAuthCredential;
}

interface AuthSettings {
    // Authentication Providers
    google_auth_enabled: boolean;
    github_auth_enabled: boolean;
    discord_auth_enabled: boolean;
    linkedin_auth_enabled: boolean;
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
}

interface Props {
    settings: AuthSettings;
    oauth_credentials: OAuthCredentials;
}

export default function AuthSettingsPage({ settings, oauth_credentials }: Props) {
    const { data, setData, patch, processing } = useForm<Record<string, boolean | number | string | OAuthCredentials>>({
        // Authentication Providers
        google_auth_enabled: settings.google_auth_enabled,
        github_auth_enabled: settings.github_auth_enabled,
        discord_auth_enabled: settings.discord_auth_enabled,
        linkedin_auth_enabled: settings.linkedin_auth_enabled,
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

        // OAuth Credentials
        oauth_credentials: oauth_credentials,
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
                    <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">Manage authentication providers and security controls</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <a href="/feature-settings">Feature Toggles</a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <a href="/oauth-credentials">Manage OAuth Credentials</a>
                        </Button>
                    </div>
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

                            {/* LinkedIn Auth */}
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label htmlFor="linkedin_auth" className="text-base font-medium">
                                        LinkedIn Authentication
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow users to sign in with their LinkedIn accounts</p>
                                </div>
                                <Switch
                                    id="linkedin_auth"
                                    checked={data.linkedin_auth_enabled}
                                    onCheckedChange={(checked: boolean) => setData('linkedin_auth_enabled', checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* OAuth Credentials */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                OAuth Credentials
                            </CardTitle>
                            <CardDescription>Manage your OAuth application credentials for social login providers</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Google OAuth */}
                            <div className="space-y-4 rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label className="text-base font-medium">Google OAuth</Label>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Configure Google OAuth 2.0 credentials</p>
                                    </div>
                                    <Switch
                                        checked={oauth_credentials.google.is_active}
                                        onCheckedChange={(checked: boolean) => {
                                            // This would need to be handled in a separate form
                                            console.log('Google OAuth active:', checked);
                                        }}
                                    />
                                </div>

                                {oauth_credentials.google.is_active && (
                                    <div className="space-y-3">
                                        <div>
                                            <Label htmlFor="google_client_id">Client ID</Label>
                                            <Input
                                                id="google_client_id"
                                                placeholder="Enter your Google Client ID"
                                                defaultValue={oauth_credentials.google.client_id}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="google_client_secret">Client Secret</Label>
                                            <Input id="google_client_secret" type="password" placeholder="Enter your Google Client Secret" />
                                        </div>
                                        <div>
                                            <Label htmlFor="google_redirect_uri">Redirect URI</Label>
                                            <Input
                                                id="google_redirect_uri"
                                                placeholder="https://yourdomain.com/auth/google/callback"
                                                defaultValue={oauth_credentials.google.redirect_uri}
                                            />
                                        </div>
                                        {oauth_credentials.google.has_valid_credentials && (
                                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                Valid credentials configured
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={oauth_credentials.google.provider_info.setup_url} target="_blank" rel="noopener noreferrer">
                                                    Setup Guide
                                                </a>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={oauth_credentials.google.provider_info.docs_url} target="_blank" rel="noopener noreferrer">
                                                    Documentation
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* GitHub OAuth */}
                            <div className="space-y-4 rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label className="text-base font-medium">GitHub OAuth</Label>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Configure GitHub OAuth App credentials</p>
                                    </div>
                                    <Switch
                                        checked={oauth_credentials.github.is_active}
                                        onCheckedChange={(checked: boolean) => {
                                            console.log('GitHub OAuth active:', checked);
                                        }}
                                    />
                                </div>

                                {oauth_credentials.github.is_active && (
                                    <div className="space-y-3">
                                        <div>
                                            <Label htmlFor="github_client_id">Client ID</Label>
                                            <Input
                                                id="github_client_id"
                                                placeholder="Enter your GitHub Client ID"
                                                defaultValue={oauth_credentials.github.client_id}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="github_client_secret">Client Secret</Label>
                                            <Input id="github_client_secret" type="password" placeholder="Enter your GitHub Client Secret" />
                                        </div>
                                        <div>
                                            <Label htmlFor="github_redirect_uri">Redirect URI</Label>
                                            <Input
                                                id="github_redirect_uri"
                                                placeholder="https://yourdomain.com/auth/github/callback"
                                                defaultValue={oauth_credentials.github.redirect_uri}
                                            />
                                        </div>
                                        {oauth_credentials.github.has_valid_credentials && (
                                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                Valid credentials configured
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={oauth_credentials.github.provider_info.setup_url} target="_blank" rel="noopener noreferrer">
                                                    Setup Guide
                                                </a>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={oauth_credentials.github.provider_info.docs_url} target="_blank" rel="noopener noreferrer">
                                                    Documentation
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Discord OAuth */}
                            <div className="space-y-4 rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label className="text-base font-medium">Discord OAuth</Label>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Configure Discord OAuth2 credentials</p>
                                    </div>
                                    <Switch
                                        checked={oauth_credentials.discord.is_active}
                                        onCheckedChange={(checked: boolean) => {
                                            console.log('Discord OAuth active:', checked);
                                        }}
                                    />
                                </div>

                                {oauth_credentials.discord.is_active && (
                                    <div className="space-y-3">
                                        <div>
                                            <Label htmlFor="discord_client_id">Client ID</Label>
                                            <Input
                                                id="discord_client_id"
                                                placeholder="Enter your Discord Client ID"
                                                defaultValue={oauth_credentials.discord.client_id}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="discord_client_secret">Client Secret</Label>
                                            <Input id="discord_client_secret" type="password" placeholder="Enter your Discord Client Secret" />
                                        </div>
                                        <div>
                                            <Label htmlFor="discord_redirect_uri">Redirect URI</Label>
                                            <Input
                                                id="discord_redirect_uri"
                                                placeholder="https://yourdomain.com/auth/discord/callback"
                                                defaultValue={oauth_credentials.discord.redirect_uri}
                                            />
                                        </div>
                                        {oauth_credentials.discord.has_valid_credentials && (
                                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                Valid credentials configured
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={oauth_credentials.discord.provider_info.setup_url} target="_blank" rel="noopener noreferrer">
                                                    Setup Guide
                                                </a>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={oauth_credentials.discord.provider_info.docs_url} target="_blank" rel="noopener noreferrer">
                                                    Documentation
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                )}
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

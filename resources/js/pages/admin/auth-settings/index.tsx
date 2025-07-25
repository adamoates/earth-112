import { Head, useForm } from '@inertiajs/react';
import { Lock, Save, Settings, Shield } from 'lucide-react';
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
    linkedin: OAuthCredential;
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
    const { data, setData, patch, processing } = useForm<Record<string, any>>({
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
                        Manage authentication, social login, registration, and security controls
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <a href="/oauth-credentials">Manage OAuth Credentials</a>
                        </Button>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    {/* Social Login Providers */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Social Login Providers
                            </CardTitle>
                            <CardDescription>Configure and manage social authentication providers for your application.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {/* Google Provider Card */}
                                <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600">
                                                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="font-medium">Google</span>
                                        </div>
                                        <Switch
                                            checked={data.google_auth_enabled}
                                            onCheckedChange={(checked: boolean) => setData('google_auth_enabled', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                        <div className="flex items-center gap-1">
                                            {oauth_credentials.google.has_valid_credentials ? (
                                                <>
                                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                    <span className="text-green-600 dark:text-green-400">Configured</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                                    <span className="text-red-600 dark:text-red-400">Missing</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* GitHub Provider Card */}
                                <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900">
                                                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="font-medium">GitHub</span>
                                        </div>
                                        <Switch
                                            checked={data.github_auth_enabled}
                                            onCheckedChange={(checked: boolean) => setData('github_auth_enabled', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                        <div className="flex items-center gap-1">
                                            {oauth_credentials.github.has_valid_credentials ? (
                                                <>
                                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                    <span className="text-green-600 dark:text-green-400">Configured</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                                    <span className="text-red-600 dark:text-red-400">Missing</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Discord Provider Card */}
                                <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5865F2]">
                                                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="font-medium">Discord</span>
                                        </div>
                                        <Switch
                                            checked={data.discord_auth_enabled}
                                            onCheckedChange={(checked: boolean) => setData('discord_auth_enabled', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                        <div className="flex items-center gap-1">
                                            {oauth_credentials.discord.has_valid_credentials ? (
                                                <>
                                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                    <span className="text-green-600 dark:text-green-400">Configured</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                                    <span className="text-red-600 dark:text-red-400">Missing</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* LinkedIn Provider Card */}
                                <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0077B5]">
                                                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="font-medium">LinkedIn</span>
                                        </div>
                                        <Switch
                                            checked={data.linkedin_auth_enabled}
                                            onCheckedChange={(checked: boolean) => setData('linkedin_auth_enabled', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                        <div className="flex items-center gap-1">
                                            {oauth_credentials.linkedin.has_valid_credentials ? (
                                                <>
                                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                    <span className="text-green-600 dark:text-green-400">Configured</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                                    <span className="text-red-600 dark:text-red-400">Missing</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between rounded-lg border bg-gray-50 p-4 dark:bg-gray-800">
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-gray-100">OAuth Credentials</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Configure API keys and secrets for your social login providers
                                    </p>
                                </div>
                                <Button asChild>
                                    <a href="/oauth-credentials">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Manage Credentials
                                    </a>
                                </Button>
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

import { Head, useForm } from '@inertiajs/react';
import { Save, Zap } from 'lucide-react';
import { useState } from 'react';

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
    {
        title: 'OAuth Credentials',
        href: '/oauth-credentials',
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

interface Props {
    oauth_credentials: OAuthCredentials;
}

export default function OAuthCredentialsPage({ oauth_credentials }: Props) {
    const [activeProvider, setActiveProvider] = useState<string | null>(null);
    const [formData, setFormData] = useState<Record<string, any>>({});

    const handleToggleProvider = (provider: string, isActive: boolean) => {
        const { patch } = useForm();

        patch(route('oauth-credentials.toggle', { provider }), {
            data: { is_active: isActive },
        });
    };

    const handleUpdateCredentials = (provider: string, data: any) => {
        const { patch } = useForm();

        patch(route('oauth-credentials.update', { provider }), {
            data: data,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="OAuth Credentials" />

            <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">OAuth Credentials</h1>
                    <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                        Manage your OAuth application credentials for social login providers
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Google OAuth */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                Google OAuth
                            </CardTitle>
                            <CardDescription>Configure Google OAuth 2.0 credentials</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="text-base font-medium">Enable Google OAuth</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow users to sign in with their Google accounts</p>
                                </div>
                                <Switch
                                    checked={oauth_credentials.google.is_active}
                                    onCheckedChange={(checked: boolean) => handleToggleProvider('google', checked)}
                                />
                            </div>

                            {oauth_credentials.google.is_active && (
                                <div className="space-y-4 rounded-lg border p-4">
                                    <div>
                                        <Label htmlFor="google_client_id">Client ID</Label>
                                        <Input
                                            id="google_client_id"
                                            placeholder="Enter your Google Client ID"
                                            defaultValue={oauth_credentials.google.client_id}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, google_client_id: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="google_client_secret">Client Secret</Label>
                                        <Input
                                            id="google_client_secret"
                                            type="password"
                                            placeholder="Enter your Google Client Secret"
                                            onChange={(e) => setFormData((prev) => ({ ...prev, google_client_secret: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="google_redirect_uri">Redirect URI</Label>
                                        <Input
                                            id="google_redirect_uri"
                                            placeholder="https://yourdomain.com/auth/google/callback"
                                            defaultValue={oauth_credentials.google.redirect_uri}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, google_redirect_uri: e.target.value }))}
                                        />
                                    </div>
                                    {oauth_credentials.google.has_valid_credentials && (
                                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            Valid credentials configured
                                        </div>
                                    )}
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() =>
                                                handleUpdateCredentials('google', {
                                                    client_id: formData.google_client_id || oauth_credentials.google.client_id,
                                                    client_secret: formData.google_client_secret,
                                                    redirect_uri: formData.google_redirect_uri || oauth_credentials.google.redirect_uri,
                                                    is_active: true,
                                                })
                                            }
                                        >
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Google Credentials
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <a href={oauth_credentials.google.provider_info.setup_url} target="_blank" rel="noopener noreferrer">
                                                Setup Guide
                                            </a>
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <a href={oauth_credentials.google.provider_info.docs_url} target="_blank" rel="noopener noreferrer">
                                                Documentation
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* GitHub OAuth */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                GitHub OAuth
                            </CardTitle>
                            <CardDescription>Configure GitHub OAuth App credentials</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="text-base font-medium">Enable GitHub OAuth</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow users to sign in with their GitHub accounts</p>
                                </div>
                                <Switch
                                    checked={oauth_credentials.github.is_active}
                                    onCheckedChange={(checked: boolean) => handleToggleProvider('github', checked)}
                                />
                            </div>

                            {oauth_credentials.github.is_active && (
                                <div className="space-y-4 rounded-lg border p-4">
                                    <div>
                                        <Label htmlFor="github_client_id">Client ID</Label>
                                        <Input
                                            id="github_client_id"
                                            placeholder="Enter your GitHub Client ID"
                                            defaultValue={oauth_credentials.github.client_id}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, github_client_id: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="github_client_secret">Client Secret</Label>
                                        <Input
                                            id="github_client_secret"
                                            type="password"
                                            placeholder="Enter your GitHub Client Secret"
                                            onChange={(e) => setFormData((prev) => ({ ...prev, github_client_secret: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="github_redirect_uri">Redirect URI</Label>
                                        <Input
                                            id="github_redirect_uri"
                                            placeholder="https://yourdomain.com/auth/github/callback"
                                            defaultValue={oauth_credentials.github.redirect_uri}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, github_redirect_uri: e.target.value }))}
                                        />
                                    </div>
                                    {oauth_credentials.github.has_valid_credentials && (
                                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            Valid credentials configured
                                        </div>
                                    )}
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() =>
                                                handleUpdateCredentials('github', {
                                                    client_id: formData.github_client_id || oauth_credentials.github.client_id,
                                                    client_secret: formData.github_client_secret,
                                                    redirect_uri: formData.github_redirect_uri || oauth_credentials.github.redirect_uri,
                                                    is_active: true,
                                                })
                                            }
                                        >
                                            <Save className="mr-2 h-4 w-4" />
                                            Save GitHub Credentials
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <a href={oauth_credentials.github.provider_info.setup_url} target="_blank" rel="noopener noreferrer">
                                                Setup Guide
                                            </a>
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <a href={oauth_credentials.github.provider_info.docs_url} target="_blank" rel="noopener noreferrer">
                                                Documentation
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Discord OAuth */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                Discord OAuth
                            </CardTitle>
                            <CardDescription>Configure Discord OAuth2 credentials</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="text-base font-medium">Enable Discord OAuth</Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow users to sign in with their Discord accounts</p>
                                </div>
                                <Switch
                                    checked={oauth_credentials.discord.is_active}
                                    onCheckedChange={(checked: boolean) => handleToggleProvider('discord', checked)}
                                />
                            </div>

                            {oauth_credentials.discord.is_active && (
                                <div className="space-y-4 rounded-lg border p-4">
                                    <div>
                                        <Label htmlFor="discord_client_id">Client ID</Label>
                                        <Input
                                            id="discord_client_id"
                                            placeholder="Enter your Discord Client ID"
                                            defaultValue={oauth_credentials.discord.client_id}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, discord_client_id: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="discord_client_secret">Client Secret</Label>
                                        <Input
                                            id="discord_client_secret"
                                            type="password"
                                            placeholder="Enter your Discord Client Secret"
                                            onChange={(e) => setFormData((prev) => ({ ...prev, discord_client_secret: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="discord_redirect_uri">Redirect URI</Label>
                                        <Input
                                            id="discord_redirect_uri"
                                            placeholder="https://yourdomain.com/auth/discord/callback"
                                            defaultValue={oauth_credentials.discord.redirect_uri}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, discord_redirect_uri: e.target.value }))}
                                        />
                                    </div>
                                    {oauth_credentials.discord.has_valid_credentials && (
                                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            Valid credentials configured
                                        </div>
                                    )}
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() =>
                                                handleUpdateCredentials('discord', {
                                                    client_id: formData.discord_client_id || oauth_credentials.discord.client_id,
                                                    client_secret: formData.discord_client_secret,
                                                    redirect_uri: formData.discord_redirect_uri || oauth_credentials.discord.redirect_uri,
                                                    is_active: true,
                                                })
                                            }
                                        >
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Discord Credentials
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <a href={oauth_credentials.discord.provider_info.setup_url} target="_blank" rel="noopener noreferrer">
                                                Setup Guide
                                            </a>
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <a href={oauth_credentials.discord.provider_info.docs_url} target="_blank" rel="noopener noreferrer">
                                                Documentation
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

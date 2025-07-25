import { Head, useForm } from '@inertiajs/react';
import { Zap } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
        title: 'Feature Toggles',
        href: '/feature-settings',
    },
];

interface FeatureSettings {
    enable_beta_dashboard: boolean;
    enable_new_notifications: boolean;
    enable_user_impersonation: boolean;
    enable_audit_log: boolean;
    enable_maintenance_mode: boolean;
    maintenance_message: string;
}

interface Props {
    settings: FeatureSettings;
}

export default function FeatureSettingsPage({ settings }: Props) {
    const { data, setData, patch, processing } = useForm<FeatureSettings>({
        enable_beta_dashboard: settings.enable_beta_dashboard,
        enable_new_notifications: settings.enable_new_notifications,
        enable_user_impersonation: settings.enable_user_impersonation,
        enable_audit_log: settings.enable_audit_log,
        enable_maintenance_mode: settings.enable_maintenance_mode,
        maintenance_message: settings.maintenance_message,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('feature-settings.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Feature Toggles" />

            <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">Feature Toggles</h1>
                    <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">Enable or disable platform features</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
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

                    <Button type="submit" disabled={processing}>
                        Save Feature Settings
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Database, Mail, Settings, Shield } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Overview',
        href: '/dashboard',
    },
    {
        title: 'Settings',
        href: '/settings',
    },
];

export default function SettingsPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                    <p className="text-gray-600 dark:text-gray-400">Configure application settings and preferences</p>
                </div>

                {/* Settings Sections */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* General Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                General Settings
                            </CardTitle>
                            <CardDescription>Basic application configuration</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="app_name">Application Name</Label>
                                <Input id="app_name" defaultValue="Earth-112" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <Select defaultValue="utc">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select timezone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="utc">UTC</SelectItem>
                                        <SelectItem value="est">Eastern Time</SelectItem>
                                        <SelectItem value="pst">Pacific Time</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select defaultValue="en">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="es">Spanish</SelectItem>
                                        <SelectItem value="fr">French</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Security Settings
                            </CardTitle>
                            <CardDescription>Security and authentication configuration</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="session_timeout">Session Timeout (minutes)</Label>
                                <Input id="session_timeout" type="number" defaultValue="120" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="max_login_attempts">Max Login Attempts</Label>
                                <Input id="max_login_attempts" type="number" defaultValue="5" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password_policy">Password Policy</Label>
                                <Select defaultValue="strong">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select policy" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="basic">Basic</SelectItem>
                                        <SelectItem value="strong">Strong</SelectItem>
                                        <SelectItem value="very_strong">Very Strong</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Email Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                Email Settings
                            </CardTitle>
                            <CardDescription>Email configuration and notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="smtp_host">SMTP Host</Label>
                                <Input id="smtp_host" defaultValue="smtp.mailgun.org" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="smtp_port">SMTP Port</Label>
                                <Input id="smtp_port" defaultValue="587" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="from_email">From Email</Label>
                                <Input id="from_email" defaultValue="aoates@earth-112.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email_notifications">Email Notifications</Label>
                                <Select defaultValue="enabled">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="enabled">Enabled</SelectItem>
                                        <SelectItem value="disabled">Disabled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5" />
                                System Settings
                            </CardTitle>
                            <CardDescription>System configuration and maintenance</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
                                <Select defaultValue="disabled">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select mode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="enabled">Enabled</SelectItem>
                                        <SelectItem value="disabled">Disabled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="debug_mode">Debug Mode</Label>
                                <Select defaultValue="disabled">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select mode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="enabled">Enabled</SelectItem>
                                        <SelectItem value="disabled">Disabled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="log_level">Log Level</Label>
                                <Select defaultValue="info">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="debug">Debug</SelectItem>
                                        <SelectItem value="info">Info</SelectItem>
                                        <SelectItem value="warning">Warning</SelectItem>
                                        <SelectItem value="error">Error</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button>Save Settings</Button>
                    <Button variant="outline">Reset to Defaults</Button>
                </div>
            </div>
        </AppLayout>
    );
}

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type Activity } from '@/types/user-dashboard';
import { formatRelativeTime, formatDateTime } from '@/utils/date';
import { Head } from '@inertiajs/react';
import { Clock, User, Mail, Shield, Activity as ActivityIcon } from 'lucide-react';

const iconMap = {
    'user-plus': User,
    'mail-check': Mail,
    'shield-check': Shield,
    'user': User,
    'lock': Shield,
    'users': User,
};

interface Props {
    activities: Activity[];
}

export default function ActivityPage({ activities = [] }: Props) {
    const groupedActivities = activities.reduce((groups, activity) => {
        const date = new Date(activity.date).toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(activity);
        return groups;
    }, {} as Record<string, Activity[]>);

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'My Activity', href: '/activity' },
            ]}
        >
            <Head title="My Activity" />
            
            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        My Activity
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        A complete history of your account activity and actions.
                    </p>
                </div>

                {/* Activity Feed */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ActivityIcon className="h-5 w-5" />
                            Activity Timeline
                        </CardTitle>
                        <CardDescription>
                            Chronological list of all your account activities
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {activities.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                                <h3 className="text-lg font-medium mb-2">No Activity Yet</h3>
                                <p>Your activity history will appear here as you use the platform.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {Object.entries(groupedActivities).map(([date, dayActivities]) => (
                                    <div key={date} className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium text-gray-900 dark:text-white">
                                                {new Date(date).toLocaleDateString(undefined, {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </h3>
                                            <div className="flex-1 h-px bg-border"></div>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            {dayActivities.map((activity) => (
                                                <div 
                                                    key={activity.id} 
                                                    className="flex items-start gap-4 p-4 rounded-lg border bg-card"
                                                >
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted shrink-0">
                                                        {iconMap[activity.icon as keyof typeof iconMap] && 
                                                            React.createElement(iconMap[activity.icon as keyof typeof iconMap], {
                                                                className: "h-5 w-5"
                                                            })
                                                        }
                                                    </div>
                                                    
                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {activity.description}
                                                            </p>
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="outline" className="text-xs">
                                                                    {activity.type}
                                                                </Badge>
                                                                <span className="text-xs text-muted-foreground">
                                                                    {formatDateTime(activity.date)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        
                                                        <p className="text-sm text-muted-foreground">
                                                            {formatRelativeTime(activity.date)}
                                                        </p>
                                                        
                                                        {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                                                            <div className="mt-2 p-2 rounded bg-muted text-xs">
                                                                <pre className="text-muted-foreground">
                                                                    {JSON.stringify(activity.metadata, null, 2)}
                                                                </pre>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
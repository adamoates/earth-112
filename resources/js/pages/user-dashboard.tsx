import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type UserDashboardData } from '@/types/user-dashboard';
import { formatRelativeTime } from '@/utils/date';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Bell, Calendar, CheckCircle, Clock, Mail, Shield, TrendingUp, User, Users } from 'lucide-react';
import React from 'react';

interface Props {
    user: UserDashboardData['user'];
    stats: UserDashboardData['stats'];
    recentActivity: UserDashboardData['recentActivity'];
    quickActions: UserDashboardData['quickActions'];
    announcements: UserDashboardData['announcements'];
    teamStats?: UserDashboardData['teamStats'];
}

const iconMap = {
    'user-plus': User,
    'mail-check': Mail,
    'shield-check': Shield,
    user: User,
    lock: CheckCircle,
    users: Users,
};

const colorMap = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
    red: 'bg-red-500 hover:bg-red-600',
    gray: 'bg-gray-500 hover:bg-gray-600',
};

export default function UserDashboard({ user, stats, recentActivity = [], quickActions = [], announcements = [], teamStats }: Props) {
    const isEditor = user.roles.includes('editor');

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">
                {/* Welcome Header */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">Welcome back, {user.name}!</h1>
                    <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">Here's what's happening with your account today.</p>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Account Age</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold sm:text-2xl">{stats.account_age_days}</div>
                            <p className="text-xs text-muted-foreground">days active</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold sm:text-2xl">{stats.profile_completion}%</div>
                            <Progress value={stats.profile_completion} className="mt-2" />
                        </CardContent>
                    </Card>

                    {isEditor && stats.invitations_sent !== undefined && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Invitations Sent</CardTitle>
                                <Mail className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold sm:text-2xl">{stats.invitations_sent}</div>
                                <p className="text-xs text-muted-foreground">total invites</p>
                            </CardContent>
                        </Card>
                    )}

                    {isEditor && teamStats && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Team Size</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold sm:text-2xl">{teamStats.total_users}</div>
                                <p className="text-xs text-muted-foreground">team members</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Quick Actions
                            </CardTitle>
                            <CardDescription>Common tasks and shortcuts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                {quickActions.map((action, index) => (
                                    <Link
                                        key={index}
                                        href={action.href}
                                        className="group flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`rounded-md p-2 text-white ${colorMap[action.color]}`}>
                                                {iconMap[action.icon as keyof typeof iconMap] &&
                                                    React.createElement(iconMap[action.icon as keyof typeof iconMap], {
                                                        className: 'h-4 w-4',
                                                    })}
                                            </div>
                                            <div>
                                                <p className="font-medium">{action.title}</p>
                                                <p className="text-sm text-muted-foreground">{action.description}</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Recent Activity
                            </CardTitle>
                            <CardDescription>Your recent account activity</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentActivity.length === 0 ? (
                                <div className="py-8 text-center text-muted-foreground">
                                    <Clock className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                                    <p>No recent activity to show</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentActivity.slice(0, 5).map((activity) => (
                                        <div key={activity.id} className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                                {iconMap[activity.icon as keyof typeof iconMap] &&
                                                    React.createElement(iconMap[activity.icon as keyof typeof iconMap], {
                                                        className: 'h-4 w-4',
                                                    })}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{activity.description}</p>
                                                <p className="text-xs text-muted-foreground">{formatRelativeTime(activity.date)}</p>
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                {activity.type}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Announcements */}
                {announcements.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Announcements
                            </CardTitle>
                            <CardDescription>Latest updates and notifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {announcements.map((announcement) => (
                                    <div key={announcement.id} className="rounded-lg border p-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-1">
                                                <h4 className="font-medium">{announcement.title}</h4>
                                                <p className="text-sm text-muted-foreground">{announcement.message}</p>
                                            </div>
                                            <Badge variant={announcement.type === 'info' ? 'default' : 'outline'} className="shrink-0">
                                                {announcement.type}
                                            </Badge>
                                        </div>
                                        <p className="mt-2 text-xs text-muted-foreground">{formatRelativeTime(announcement.created_at)}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Editor-specific Team Overview */}
                {isEditor && teamStats && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Team Overview
                            </CardTitle>
                            <CardDescription>Quick overview of team status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{teamStats.total_users}</div>
                                    <p className="text-sm text-muted-foreground">Total Users</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{teamStats.active_invitations}</div>
                                    <p className="text-sm text-muted-foreground">Active Invitations</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">{teamStats.pending_access_requests}</div>
                                    <p className="text-sm text-muted-foreground">Pending Requests</p>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Button asChild size="sm" variant="outline">
                                    <Link href="/access-requests">Review Requests</Link>
                                </Button>
                                <Button asChild size="sm" variant="outline">
                                    <Link href="/invitations/create">Send Invitation</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

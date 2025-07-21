export interface UserDashboardData {
    user: UserProfile;
    stats: PersonalStats;
    recentActivity: Activity[];
    quickActions: QuickAction[];
    announcements: Announcement[];
    teamStats?: TeamStats; // Only for editors
}

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at: string;
    email_verified_at: string | null;
}

export interface PersonalStats {
    account_age_days: number;
    profile_completion: number;
    last_login: string;
    invitations_sent?: number; // For editors
    access_requests_processed?: number; // For editors
}

export interface Activity {
    id: string;
    type: 'account' | 'security' | 'content' | 'team';
    description: string;
    date: string;
    icon: string;
    metadata?: Record<string, unknown>;
}

export interface QuickAction {
    title: string;
    description: string;
    href: string;
    icon: string;
    color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';
}

export interface Announcement {
    id: number;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
    created_at: string;
}

export interface TeamStats {
    total_users: number;
    active_invitations: number;
    pending_access_requests: number;
}

export interface UserNavigationItem {
    title: string;
    href: string;
    icon: string;
    description?: string;
    badge?: string | number;
    isActive?: boolean;
}
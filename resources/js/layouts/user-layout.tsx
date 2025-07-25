import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Activity, LayoutGrid, Settings, Shield, User, Users } from 'lucide-react';

export function UserSidebar() {
    const { auth } = usePage().props as unknown as { auth: { user?: { roles?: Array<{ name: string }> } } };
    const userRoles = Array.isArray(auth.user?.roles) ? auth.user.roles.map((role) => role.name) : [];
    const isEditor = userRoles.includes('editor');

    const userNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'My Profile',
            href: '/settings/profile',
            icon: User,
        },
        {
            title: 'My Activity',
            href: '/activity',
            icon: Activity,
        },
        {
            title: 'Settings',
            href: '/settings',
            icon: Settings,
        },
        // Editor-specific navigation items
        ...(isEditor
            ? [
                  {
                      title: 'Team',
                      href: '/team',
                      icon: Users,
                  },
                  {
                      title: 'Access Requests',
                      href: '/access-requests',
                      icon: Shield,
                  },
              ]
            : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                                    <span className="text-lg font-bold text-white dark:text-black">E</span>
                                </div>
                                <div className="ml-1 grid flex-1 text-left text-sm">
                                    <span className="mb-0.5 truncate leading-tight font-semibold">Earth-112</span>
                                    <span className="text-sidebar-muted-foreground truncate text-xs">{userRoles.join(', ') || 'User'}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={userNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

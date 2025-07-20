import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BarChart3, LayoutGrid, Shield, Users } from 'lucide-react';

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const isAdmin = auth.user?.role === 'admin';

    const mainNavItems: NavItem[] = [
        {
            title: 'Overview',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        ...(isAdmin
            ? [
                  {
                      title: 'User Management',
                      href: '/users',
                      icon: Users,
                  },
              ]
            : []),
        {
            title: 'Security',
            href: '/security',
            icon: Shield,
        },
        {
            title: 'Analytics',
            href: '/analytics',
            icon: BarChart3,
        },
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
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

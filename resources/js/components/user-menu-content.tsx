import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        setIsLogoutDialogOpen(false);
        // Let the logout process handle the cleanup naturally
        // router.flushAll() is called too early and causes modal to close abruptly
    };

    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLogoutDialogOpen(true);
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full cursor-pointer" onClick={handleLogoutClick}>
                <LogOut className="mr-2" />
                Log out
            </DropdownMenuItem>

            {/* Dialog moved outside of DropdownMenu to prevent conflicts */}
            <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Logout</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to log out? You will need to sign in again to access your account.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" asChild>
                            <Link method="post" href={route('logout')} as="button" onClick={handleLogout}>
                                Yes, log out
                            </Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

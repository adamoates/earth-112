import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

type Appearance = 'light' | 'dark' | 'system';

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    const updateAppearance = (newAppearance: Appearance) => {
        // Set cookie for Laravel to read
        document.cookie = `appearance=${newAppearance}; path=/; max-age=${365 * 24 * 60 * 60}`;

        // Update the HTML class for immediate effect
        const html = document.documentElement;
        html.classList.remove('light', 'dark');

        if (newAppearance === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            html.classList.add(systemTheme);
        } else {
            html.classList.add(newAppearance);
        }

        // Reload the page to update Laravel's server-side rendering
        window.location.reload();
    };

    // Get current appearance from cookie or default to system
    const getCurrentAppearance = (): Appearance => {
        const cookies = document.cookie.split(';');
        const appearanceCookie = cookies.find((cookie) => cookie.trim().startsWith('appearance='));
        if (appearanceCookie) {
            const value = appearanceCookie.split('=')[1];
            if (['light', 'dark', 'system'].includes(value)) {
                return value as Appearance;
            }
        }
        return 'system';
    };

    const currentAppearance = getCurrentAppearance();

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800', className)} {...props}>
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        currentAppearance === value
                            ? 'bg-white text-gray-900 shadow-xs dark:bg-gray-700 dark:text-white'
                            : 'text-gray-500 hover:bg-gray-200/60 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700/60 dark:hover:text-white',
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}

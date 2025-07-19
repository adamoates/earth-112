import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof Link>;

export default function TextLink({ className = '', children, ...props }: LinkProps) {
    return (
        <Link
            className={cn(
                'text-blue-600 transition-colors duration-300 ease-out hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}

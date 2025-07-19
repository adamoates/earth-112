import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof Link>;

export default function TextLink({ className = '', children, ...props }: LinkProps) {
    return (
        <Link
            className={cn(
                'text-blue-600 underline decoration-gray-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:text-blue-400 dark:decoration-gray-500',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}

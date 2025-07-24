import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-4 sm:px-8 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-6 text-white sm:p-10 lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium">
                    <AppLogoIcon className="mr-2 size-6 fill-current text-white sm:size-8" />
                    {name}
                </Link>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-base sm:text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
                        <AppLogoIcon className="h-8 fill-current text-black sm:h-10" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-lg font-medium sm:text-xl">{title}</h1>
                        <p className="text-sm text-balance text-gray-600 dark:text-gray-400">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

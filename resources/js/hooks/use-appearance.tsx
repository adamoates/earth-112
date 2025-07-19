import { useEffect, useState } from 'react';

import { getCookie, setCookie } from '@/lib/utils';

export type Appearance = 'light' | 'dark' | 'system';

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');

    useEffect(() => {
        // Get initial appearance from cookie or default to system
        const savedAppearance = getCookie('appearance') as Appearance;
        if (savedAppearance && ['light', 'dark', 'system'].includes(savedAppearance)) {
            setAppearance(savedAppearance);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');

        if (appearance === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(appearance);
    }, [appearance]);

    const updateAppearance = (newAppearance: Appearance) => {
        setAppearance(newAppearance);
        // Store in cookie for persistence...
        setCookie('appearance', newAppearance, 365);
    };

    return {
        appearance,
        updateAppearance,
    };
}

export function initializeTheme() {
    const savedAppearance = getCookie('appearance') as Appearance;
    const appearance = savedAppearance && ['light', 'dark', 'system'].includes(savedAppearance) ? savedAppearance : 'system';

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (appearance === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
        return;
    }

    root.classList.add(appearance);
}

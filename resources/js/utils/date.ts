import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

export function formatDate(date: string | Date | null | undefined): string {
    if (!date) return 'N/A';
    
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) return 'Invalid date';
    
    return format(dateObj, 'MMM d, yyyy');
}

export function formatDateTime(date: string | Date | null | undefined): string {
    if (!date) return 'N/A';
    
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) return 'Invalid date';
    
    return format(dateObj, 'MMM d, yyyy h:mm a');
}

export function formatRelativeTime(date: string | Date | null | undefined): string {
    if (!date) return 'N/A';
    
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) return 'Invalid date';
    
    return formatDistanceToNow(dateObj, { addSuffix: true });
}

export function isExpired(date: string | Date | null | undefined): boolean {
    if (!date) return false;
    
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) return false;
    
    return dateObj < new Date();
}
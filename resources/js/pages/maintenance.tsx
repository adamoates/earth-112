import { Head } from '@inertiajs/react';
import { AlertTriangle, Wrench } from 'lucide-react';

import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

interface Props {
    message: string;
}

export default function MaintenancePage({ message }: Props) {
    return (
        <AuthLayout title="Under Maintenance" description="We're working on something awesome">
            <Head title="Under Maintenance" />

            <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
                <div className="w-full max-w-md text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20">
                        <Wrench className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                    </div>

                    <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Under Maintenance</h1>

                    <p className="mb-6 text-gray-600 dark:text-gray-400">{message}</p>

                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
                            <div className="text-sm text-amber-800 dark:text-amber-200">
                                <p className="font-medium">We'll be back soon!</p>
                                <p className="mt-1">Our team is working hard to improve your experience. Please check back later.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button onClick={() => window.location.reload()} className="w-full">
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Shield } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthLayout from '@/layouts/auth-layout';

type RequestAccessForm = {
    name: string;
    email: string;
    company: string;
    reason: string;
};

export default function RequestAccess() {
    const { data, setData, post, processing, errors, reset } = useForm<RequestAccessForm>({
        name: '',
        email: '',
        company: '',
        reason: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('request-access'), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthLayout title="Request Access" description="Submit your request for platform access">
            <Head title="Request Access" />

            <div className="mx-auto max-w-2xl">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Request Platform Access</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fill out the form below to request an invitation code for Earth-112.</p>
                </div>

                <div className="rounded-lg border bg-card p-8 shadow-sm">
                    <form className="space-y-6" onSubmit={submit}>
                        <div className="space-y-3">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="John Doe"
                                className="h-12"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="john@example.com"
                                className="h-12"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Company/Organization
                            </Label>
                            <Input
                                id="company"
                                type="text"
                                required
                                autoComplete="organization"
                                value={data.company}
                                onChange={(e) => setData('company', e.target.value)}
                                disabled={processing}
                                placeholder="Your Company Inc."
                                className="h-12"
                            />
                            <InputError message={errors.company} />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="reason" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Reason for Access
                            </Label>
                            <Textarea
                                id="reason"
                                required
                                value={data.reason}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('reason', e.target.value)}
                                disabled={processing}
                                placeholder="Please explain why you need access to this platform..."
                                rows={4}
                                className="min-h-[120px]"
                            />
                            <InputError message={errors.reason} />
                        </div>

                        <Button type="submit" className="h-12 w-full" disabled={processing}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Request
                        </Button>
                    </form>

                    <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
                        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <TextLink
                                href={route('login')}
                                className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Sign in
                            </TextLink>
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start gap-3">
                        <Mail className="mt-0.5 h-4 w-4 text-gray-500" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p className="font-medium text-gray-900 dark:text-white">What happens next?</p>
                            <ul className="mt-3 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">•</span>
                                    <span>Your request will be reviewed by administrators</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">•</span>
                                    <span>You'll receive an email with the decision</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">•</span>
                                    <span>If approved, you'll get an invitation code</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 dark:text-blue-400">•</span>
                                    <span>Use the code to complete your registration</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

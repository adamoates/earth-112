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

            <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Request Platform Access</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Fill out the form below to request an invitation code for Earth-112.</p>
            </div>

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-gray-900 dark:text-white">
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
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-gray-900 dark:text-white">
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
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="company" className="text-gray-900 dark:text-white">
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
                        />
                        <InputError message={errors.company} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="reason" className="text-gray-900 dark:text-white">
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
                        />
                        <InputError message={errors.reason} />
                    </div>
                </div>

                <Button type="submit" className="w-full" disabled={processing}>
                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Request
                </Button>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <TextLink href={route('login')} className="font-medium text-blue-600 hover:text-blue-700">
                        Sign in
                    </TextLink>
                </div>
            </form>

            <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-gray-500" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-medium text-gray-900 dark:text-white">What happens next?</p>
                        <ul className="mt-2 space-y-1">
                            <li>• Your request will be reviewed by administrators</li>
                            <li>• You'll receive an email with the decision</li>
                            <li>• If approved, you'll get an invitation code</li>
                            <li>• Use the code to complete your registration</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

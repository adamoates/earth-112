import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    invitation_code: string;
};

export default function Register() {
    const { url } = usePage();
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const urlCode = urlParams.get('code');

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        invitation_code: urlCode || '',
    });

    // Set invitation code from URL if present
    useEffect(() => {
        if (urlCode) {
            setData('invitation_code', urlCode.toUpperCase());
        }
    }, [urlCode, setData]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="invitation_code" className="text-gray-900 dark:text-white">
                            Invitation Code
                        </Label>
                        <Input
                            id="invitation_code"
                            type="text"
                            required
                            autoFocus={!urlCode}
                            tabIndex={1}
                            autoComplete="off"
                            value={data.invitation_code}
                            onChange={(e) => setData('invitation_code', e.target.value.toUpperCase())}
                            disabled={processing}
                            placeholder="Enter your invitation code"
                        />
                        <InputError message={errors.invitation_code} className="mt-2" />
                        {urlCode && <p className="text-sm text-green-600 dark:text-green-400">✓ Invitation code loaded from email link</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-gray-900 dark:text-white">
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-gray-900 dark:text-white">
                            Email address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={3}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-gray-900 dark:text-white">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="text-gray-900 dark:text-white">
                            Confirm password
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={5}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full bg-blue-600 text-white hover:bg-blue-700" tabIndex={6} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={7} className="font-medium text-blue-600 hover:text-blue-700">
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}

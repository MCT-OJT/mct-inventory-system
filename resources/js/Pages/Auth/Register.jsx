import InputError from '@/Components/InputError';
import InfoCard from '@/Components/inventory/specificItem/infoCard';
import { Button } from '@/Components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { UserRound } from 'lucide-react';

export default function Register() {
    const { toast } = useToast();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Successfully registered a user.',
                    className: 'bg-green-300 text-green-900 border-none',
                });
            },
            onError: () => {
                toast({
                    title: 'Failed',
                    description: 'Something went wrong.',
                    className: 'bg-red-300 text-red-900 border-none',
                });
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <form onSubmit={submit}>
            <InfoCard LabelIcon={UserRound} label="Add User" className="flex-1">
                <div className="col-span-12">
                    <Label htmlFor="user_name">Name</Label>

                    <Input
                        id="user_name"
                        name="name"
                        value={data.name}
                        className="w-full"
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="col-span-12">
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="col-span-12">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="col-span-12">
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>

                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-32 bg-green-700 text-white hover:bg-green-800"
                    disabled={processing}
                >
                    {processing ? 'Saving...' : 'Register'}
                </Button>
            </InfoCard>
        </form>
    );
}

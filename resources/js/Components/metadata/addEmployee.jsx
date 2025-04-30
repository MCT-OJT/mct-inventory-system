import InfoCard from '@/Components/inventory/specificItem/infoCard';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { UserRound } from 'lucide-react';

export function AddEmployee() {
    const { toast } = useToast();

    const { data, setData, post, processing, reset } = useForm({
        id_number: '',
        name: '',
        department: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/employee', {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Successfully added the item.',
                    className: 'bg-green-300 text-green-900 border-none',
                });
                reset();
                console.log('LAYYYYY sakit');
            },
            onError: () => {
                toast({
                    title: 'Failed',
                    description: 'Something went wrong.',
                    className: 'bg-red-300 text-red-900 border-none',
                });
            },
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <InfoCard
                LabelIcon={UserRound}
                label="Add New Employee"
                className="basis-1/3"
            >
                <div className="col-span-4">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input
                        id="idNumber"
                        className="w-full"
                        value={data.id_number}
                        onChange={(e) => setData('id_number', e.target.value)}
                    />
                </div>
                <div className="col-span-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        className="w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </div>
                <div className="col-span-4">
                    <Label htmlFor="department">Department</Label>
                    <Input
                        id="department"
                        className="w-full"
                        value={data.department}
                        onChange={(e) => setData('department', e.target.value)}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-32 bg-green-700 text-white hover:bg-green-800"
                    disabled={processing}
                >
                    {processing ? 'Saving...' : 'Save'}
                </Button>
            </InfoCard>
        </form>
    );
}

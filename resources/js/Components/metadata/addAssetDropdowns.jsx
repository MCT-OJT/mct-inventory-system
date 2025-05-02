import InfoCard from '@/Components/inventory/specificItem/infoCard';
import { Button } from '@/Components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { router, useForm } from '@inertiajs/react';
import { MonitorSmartphone } from 'lucide-react';
import { useRef } from 'react';

export function AddAssetDropdowns() {
    const { toast } = useToast();
    const fileInputRef = useRef(null);

    const { data, setData, processing, reset } = useForm({
        asset_type: '',
        asset_brand: '',
        model_name: '',
        image: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('asset_type', data.asset_type);
        formData.append('asset_brand', data.asset_brand);
        formData.append('model_name', data.model_name);
        formData.append('file', data.image);

        router.post('/new-assets', formData, {
            forceFormData: true,
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Successfully added the item.',
                    className: 'bg-green-300 text-green-900 border-none',
                });
                reset();
                fileInputRef.current.value = '';
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
                LabelIcon={MonitorSmartphone}
                label="Add New Asset Dropdowns"
                className="basis-2/3"
            >
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4">
                        <Label htmlFor="assetType">Asset Type</Label>
                        <Input
                            id="assetType"
                            className="w-full"
                            value={data.asset_type}
                            onChange={(e) =>
                                setData('asset_type', e.target.value)
                            }
                        />
                    </div>
                    <div className="col-span-4">
                        <Label htmlFor="assetBrand">Asset Brand</Label>
                        <Input
                            id="assetBrand"
                            className="w-full"
                            value={data.asset_brand}
                            onChange={(e) =>
                                setData('asset_brand', e.target.value)
                            }
                        />
                    </div>
                    <div className="col-span-4">
                        <Label htmlFor="modelName">Model Name</Label>
                        <Input
                            id="modelName"
                            className="w-full"
                            value={data.model_name}
                            onChange={(e) =>
                                setData('model_name', e.target.value)
                            }
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-32 bg-green-700 text-white hover:bg-green-800"
                        disabled={processing}
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </Button>
                </div>
                <Card className="flex h-60 w-full flex-col items-center justify-center gap-1">
                    <Label htmlFor="picture" className="text-sm font-medium">
                        Upload Image
                    </Label>
                    <Input
                        ref={fileInputRef}
                        id="picture"
                        type="file"
                        accept="image/*"
                        className="w-56 cursor-pointer"
                        onChange={(e) => setData('image', e.target.files[0])}
                    />
                </Card>
            </InfoCard>
        </form>
    );
}

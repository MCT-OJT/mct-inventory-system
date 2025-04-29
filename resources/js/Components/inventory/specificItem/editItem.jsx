import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, FilePen } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export function EditItem({ employee, assets, specificAsset }) {
    const { toast } = useToast();

    const { data, setData, put, processing, errors, reset } = useForm({
        id: specificAsset.id,
        serial_number: specificAsset.serial_number || '',
        asset_brand: specificAsset.asset?.asset_brand || '',
        asset_type: specificAsset.asset?.asset_type || '',
        model_name: specificAsset.asset?.model_name || '',
        status: specificAsset.status || '',
        date_acquired: specificAsset.date_acquired
            ? new Date(specificAsset.date_acquired).toISOString().split('T')[0]
            : '',
        deployed_date: specificAsset.deployed_date
            ? new Date(specificAsset.deployed_date).toISOString().split('T')[0]
            : '',
        employee_id: specificAsset.employee_id || '',
        remarks: specificAsset.remarks || '',
    });

    const Astatus = ['Available', 'Deployed', 'Decommissioned', 'Listed'];

    const uniqueTypes = useMemo(() => {
        return [...new Set(assets.map((a) => a.asset_type))];
    }, [assets]);

    const filteredBrands = useMemo(() => {
        return assets.filter((a) => a.asset_type === data.asset_type);
    }, [assets, data.asset_type]);

    const filteredModels = useMemo(() => {
        return assets.filter((a) => a.asset_brand === data.asset_brand);
    }, [assets, data.asset_brand]);

    const handleChange = (key, value) => {
        if (key === 'asset_type') {
            setData({
                ...data,
                asset_type: value,
                asset_brand: '',
                model_name: '',
            });
        } else if (key === 'asset_brand') {
            setData({
                ...data,
                asset_brand: value,
                model_name: '',
            });
        } else {
            setData({
                ...data,
                [key]: value,
            });
        }
    };

    const [open, setOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.asset_brand) {
            toast({
                title: 'Error',
                description: 'Asset brand is required.',
                className: 'bg-red-300 text-red-900 border-none',
            });
            return;
        }

        if (!data.model_name) {
            toast({
                title: 'Error',
                description: 'Model name is required.',
                className: 'bg-red-300 text-red-900 border-none',
            });
            return;
        }

        put('/inventory', {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Successfully updated the item.',
                    className: 'bg-green-300 text-green-900 border-none',
                });
                reset();
                setOpen(false);
                router.visit(`/inventory/${data.id}`);
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <FilePen /> Edit Item
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Item</DialogTitle>
                    <DialogDescription>
                        Add an item to your inventory.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* SERIAL NUMBER INPUT FIELD */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="serial" className="text-right">
                                Serial Number
                            </Label>
                            <Input
                                id="serial"
                                value={data.serial_number}
                                onChange={(e) =>
                                    handleChange(
                                        'serial_number',
                                        e.target.value,
                                    )
                                }
                                className="col-span-3"
                            />
                            {errors.serial_number && (
                                <p className="text-red-500">
                                    {errors.serial_number}
                                </p>
                            )}
                        </div>

                        {/*
                            ASSET TYPE DROPDOWN
                         */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="asset-type" className="text-right">
                                Asset Type
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-32">
                                        {data.asset_type || '- Select Type -'}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        ASSETS
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {uniqueTypes.map((asset_type) => (
                                            <DropdownMenuItem
                                                key={asset_type}
                                                onClick={() =>
                                                    handleChange(
                                                        'asset_type',
                                                        asset_type,
                                                    )
                                                }
                                            >
                                                {asset_type}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {errors.asset_type && (
                                <p className="text-red-500">
                                    {errors.asset_type}
                                </p>
                            )}
                        </div>
                        {/*
                            ASSET BRAND DROPDOWN
                         */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="user-incharge"
                                className="text-right"
                            >
                                Asset Brand
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            'w-fit justify-start px-3 text-left font-normal',
                                        )}
                                    >
                                        {data.asset_brand || '- Select Type -'}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        ASSET BRAND
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {filteredBrands.map((brand) => (
                                            <DropdownMenuItem
                                                key={brand.asset_brand}
                                                onClick={() =>
                                                    handleChange(
                                                        'asset_brand',
                                                        brand.asset_brand,
                                                    )
                                                }
                                            >
                                                {brand.asset_brand}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {errors.asset_brand && (
                                <p className="text-red-500">
                                    {errors.asset_brand}
                                </p>
                            )}
                        </div>
                        {/*
                            ASSET MODEL NAME DROPDOWN
                         */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="user-incharge"
                                className="text-right"
                            >
                                Model Name
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            'w-fit justify-start px-3 text-left font-normal',
                                        )}
                                    >
                                        {data.model_name || '- Select Type -'}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        MODEL NAME
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {filteredModels.map((model) => (
                                            <DropdownMenuItem
                                                key={model.model_name}
                                                onClick={() =>
                                                    handleChange(
                                                        'model_name',
                                                        model.model_name,
                                                    )
                                                }
                                            >
                                                {model.model_name}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {errors.model_name && (
                                <p className="text-red-500">
                                    {errors.model_name}
                                </p>
                            )}
                        </div>
                        {/*
                            DATE ACQUIRED PICKER
                         */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="date-acquired"
                                className="text-right"
                            >
                                Date Acquired
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            'w-fit justify-start px-3 text-left font-normal',
                                            !data.date_acquired.date_acquired &&
                                                'min-w-[120px] text-muted-foreground',
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.date_acquired ? (
                                            format(
                                                new Date(data.date_acquired),
                                                'PPP',
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={
                                            data.date_acquired
                                                ? new Date(data.date_acquired)
                                                : undefined
                                        }
                                        onSelect={(date) => {
                                            setData(
                                                'date_acquired',
                                                date
                                                    ? format(date, 'yyyy-MM-dd')
                                                    : '',
                                            );
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.date_acquired && (
                                <p className="text-red-500">
                                    {errors.date_acquired}
                                </p>
                            )}
                        </div>
                        {/*
                            ASSET STATUS DROPDOWN
                         */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-32">
                                        {data.status || '- Select Type -'}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        STATUS
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {Astatus.map((status) => (
                                            <DropdownMenuItem
                                                key={status}
                                                onClick={() =>
                                                    handleChange(
                                                        'status',
                                                        status,
                                                    )
                                                }
                                            >
                                                {status}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {errors.status && (
                                <p className="text-red-500">{errors.status}</p>
                            )}
                        </div>
                        {/*
                            DATE DEPLOYED PICKER
                         */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="date-deployed"
                                className="text-right"
                            >
                                Date Deployed
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            'w-fit justify-start px-3 text-left font-normal',
                                            !data.deployed_date &&
                                                'min-w-[120px] text-muted-foreground',
                                            data.status !== 'Deployed' &&
                                                'cursor-not-allowed opacity-50',
                                        )}
                                        disabled={data.status !== 'Deployed'}
                                    >
                                        <CalendarIcon />
                                        {data.deployed_date ? (
                                            format(
                                                new Date(data.deployed_date),
                                                'PPP',
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                {data.status === 'Deployed' && (
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={
                                                data.deployed_date
                                                    ? new Date(
                                                          data.deployed_date,
                                                      )
                                                    : undefined
                                            }
                                            onSelect={(date) => {
                                                setData(
                                                    'deployed_date',
                                                    date
                                                        ? format(
                                                              date,
                                                              'yyyy-MM-dd',
                                                          )
                                                        : '',
                                                );
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                )}
                            </Popover>
                            {errors.deployed_date && (
                                <p className="text-red-500">
                                    {errors.deployed_date}
                                </p>
                            )}
                        </div>
                        {/*
                            USER INCHARGE DROPDOWN
                         */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="user-incharge"
                                className="text-right"
                            >
                                User Incharge
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            'w-fit justify-start px-3 text-left font-normal',
                                            data.status !== 'Deployed' &&
                                                'cursor-not-allowed opacity-50',
                                        )}
                                        disabled={data.status !== 'Deployed'}
                                    >
                                        {data.employee_id
                                            ? employee.find(
                                                  (emp) =>
                                                      emp.id ===
                                                      data.employee_id,
                                              )?.name || '- Select Type -'
                                            : '- Select Type -'}{' '}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        USER INCHARGE
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {employee.map((emp) => (
                                            <DropdownMenuItem
                                                key={emp.id}
                                                onClick={() =>
                                                    handleChange(
                                                        'employee_id',
                                                        emp.id,
                                                    )
                                                }
                                            >
                                                {emp.name}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {errors.user_incharge && (
                                <p className="text-red-500">
                                    {errors.user_incharge}
                                </p>
                            )}
                        </div>
                        {/*
                            REMARKS
                         */}
                        <div className="grid grid-cols-4 items-baseline gap-4">
                            <Label htmlFor="remarks" className="text-right">
                                Remarks
                            </Label>
                            <Textarea
                                id="remarks"
                                className="col-span-3 h-20"
                                value={data.remarks}
                                onChange={(e) =>
                                    handleChange('remarks', e.target.value)
                                }
                            />
                            {errors.remarks && (
                                <p className="text-red-500">{errors.remarks}</p>
                            )}
                        </div>
                    </div>
                    {/* SAVE CHANGES */}
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-green-700 text-white hover:bg-green-800"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

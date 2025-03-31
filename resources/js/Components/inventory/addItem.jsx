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
import { CalendarIcon, PackagePlus } from 'lucide-react';

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
import { useState } from 'react';

export function AddItem() {
    const { toast } = useToast();

    const [selectedAtype, setSelectedAtype] = useState('- Select -');
    const [selectedAstatus, setSelectedAstatus] = useState('- Select -');
    const [selectedUincharge, setSelectedUincharge] = useState('- Select -');

    const handleSelectAtype = (type) => {
        setSelectedAtype(type);
        setData('asset_type', type);
    };

    const handleSelectAstatus = (type) => {
        setSelectedAstatus(type);
        setData('status', type);
    };

    const handleSelectUincharge = (type) => {
        setSelectedUincharge(type);
        setData('user_incharge', type);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        serial_number: '',
        asset_name: '',
        asset_type: '',
        status: '',
        date_acquired: '',
        deployed_date: '',
        user_incharge: '',
        remarks: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/inventory', {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Successfully added the item.',
                    className: 'bg-green-300 text-green-900 border-none',
                });
                reset();
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

    const assetTypes = [
        'Monitor',
        'System Unit',
        'Laptop',
        'Server',
        'UPS',
        'Printer',
        'iPad',
        'Smartphone',
        'Accessories',
    ];

    const Astatus = ['Available', 'Deployed', 'Decommissioned', 'Listed'];

    //! SOON TO IMPLEMENT DYNAMIC USER INCHARGE
    const userIncharge = [
        'Lymuel Bracamonte',
        'Roderick Danzing',
        'Hubert Obsioma',
        'Kenneth Lumandog',
        'Kenneth Hinlo',
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-primary text-white hover:bg-darkerPrimary">
                    <PackagePlus />
                    Add Item
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="serial" className="text-right">
                                Serial Number
                            </Label>
                            <Input
                                id="serial"
                                value={data.serial_number}
                                onChange={(e) =>
                                    setData('serial_number', e.target.value)
                                }
                                className="col-span-3"
                            />
                            {errors.serial_number && (
                                <p className="text-red-500">
                                    {errors.serial_number}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="asset-name" className="text-right">
                                Asset Name
                            </Label>
                            <Input
                                id="asset-name"
                                value={data.asset_name}
                                onChange={(e) =>
                                    setData('asset_name', e.target.value)
                                }
                                className="col-span-3"
                            />
                            {errors.asset_name && (
                                <p className="text-red-500">
                                    {errors.asset_name}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="asset-type" className="text-right">
                                Asset Type
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-32">
                                        {selectedAtype}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        ASSETS
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {assetTypes.map((type) => (
                                            <DropdownMenuItem
                                                key={type}
                                                onClick={() =>
                                                    handleSelectAtype(type)
                                                }
                                            >
                                                {type}
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
                                            !data.date_acquired &&
                                                'min-w-[120px] text-muted-foreground',
                                        )}
                                    >
                                        <CalendarIcon />
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
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={data.date_acquired}
                                        onSelect={(date) =>
                                            setData(
                                                'date_acquired',
                                                date
                                                    ? format(date, 'yyyy-MM-dd')
                                                    : '',
                                            )
                                        }
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

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-32">
                                        {selectedAstatus}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        STATUS
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {Astatus.map((type) => (
                                            <DropdownMenuItem
                                                key={type}
                                                onClick={() =>
                                                    handleSelectAstatus(type)
                                                }
                                            >
                                                {type}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {errors.status && (
                                <p className="text-red-500">{errors.status}</p>
                            )}
                        </div>

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
                                            selectedAstatus !== 'Deployed' &&
                                                'cursor-not-allowed opacity-50',
                                        )}
                                        disabled={
                                            selectedAstatus !== 'Deployed'
                                        }
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
                                {selectedAstatus === 'Deployed' && (
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={data.deployed_date}
                                            onSelect={(date) =>
                                                setData(
                                                    'deployed_date',
                                                    date
                                                        ? format(
                                                              date,
                                                              'yyyy-MM-dd',
                                                          )
                                                        : '',
                                                )
                                            }
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
                                            selectedAstatus !== 'Deployed' &&
                                                'cursor-not-allowed opacity-50',
                                        )}
                                        disabled={
                                            selectedAstatus !== 'Deployed'
                                        }
                                    >
                                        {selectedUincharge}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        USER INCHARGE
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {userIncharge.map((type) => (
                                            <DropdownMenuItem
                                                key={type}
                                                onClick={() =>
                                                    handleSelectUincharge(type)
                                                }
                                            >
                                                {type}
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

                        <div className="grid grid-cols-4 items-baseline gap-4">
                            <Label htmlFor="remarks" className="text-right">
                                Remarks
                            </Label>
                            <Textarea
                                id="remarks"
                                className="col-span-3 h-20"
                                value={data.remarks}
                                onChange={(e) =>
                                    setData('remarks', e.target.value)
                                }
                            />
                            {errors.remarks && (
                                <p className="text-red-500">{errors.remarks}</p>
                            )}
                        </div>
                    </div>
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

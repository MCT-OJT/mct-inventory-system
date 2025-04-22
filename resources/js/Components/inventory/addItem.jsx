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

export function AddItem({ employee, models }) {
    //*NEW
    const uniqueTypes = [...new Set(models.map((item) => item.asset_type))];

    //! HERE
    const [selectedAtype, setSelectedAtype] = useState('- Select -');
    const [filteredModels, setFilteredModels] = useState([]);

    //! HERE
    const handleSelectAtype = (asset_type) => {
        setSelectedAtype(asset_type);
        setSelectedModelName('- Select -');
        setData('asset_type', asset_type);
        const filtered = models.filter(
            (model) => model.asset_type === asset_type,
        );
        setFilteredModels(filtered);
    };

    const { toast } = useToast();

    const [selectedAstatus, setSelectedAstatus] = useState('- Select -');
    const [selectedUincharge, setSelectedUincharge] = useState('- Select -');
    const [selectedModelName, setSelectedModelName] = useState('- Select -');

    const handleSelectAstatus = (type) => {
        setSelectedAstatus(type);
        setData('status', type);
    };

    const handleSelectUincharge = (name, id) => {
        setSelectedUincharge(name);
        setData('employee_id', id);
        console.log('handle select emp NAME', name);
    };

    const handleSelectAssetModel = (model_name) => {
        setSelectedModelName(model_name);
        setData('model_name', model_name);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        serial_number: '',
        asset_name: '',
        asset_type: '',
        model_name: '',
        status: '',
        date_acquired: '',
        deployed_date: '',
        employee_id: '',
        remarks: '',
    });

    const handleSubmit = (e) => {
        console.log('SULOD FORM DATA NOW LODS', data);
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

    const Astatus = ['Available', 'Deployed', 'Decommissioned', 'Listed'];

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
                        {/* SERIAL NUMBER INPUT FIELD */}
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
                        {/* ASSET NAME INPUT FIELD */}
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
                                        {selectedAtype}
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
                                                    handleSelectAtype(
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
                            MODEL DROPDOWN
                         */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="user-incharge"
                                className="text-right"
                            >
                                Asset Model
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            'w-fit justify-start px-3 text-left font-normal',
                                        )}
                                    >
                                        {selectedModelName}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        ASSET MODEL
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {filteredModels.map((model) => (
                                            <DropdownMenuItem
                                                key={model.model_name}
                                                onClick={() =>
                                                    handleSelectAssetModel(
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
                            {errors.user_incharge && (
                                <p className="text-red-500">
                                    {errors.user_incharge}
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
                                        {employee.map((emp) => (
                                            <DropdownMenuItem
                                                key={emp.id}
                                                onClick={() =>
                                                    handleSelectUincharge(
                                                        emp.name,
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
                            ASSET TYPE DROPDOWN
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
                                    setData('remarks', e.target.value)
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

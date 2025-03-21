import { Button } from '@/components/ui/button';
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

import { PackagePlus } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function AddItem() {
    const [date, setDate] = useState();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="bg-primary text-white hover:bg-darkerPrimary hover:text-white"
                    variant="outline"
                >
                    <PackagePlus />
                    Add Item
                </Button>
            </DialogTrigger>
            <DialogContent className="h-96 overflow-y-auto sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Item</DialogTitle>
                    <DialogDescription>
                        Add item to your inventory here. Click save when you're
                        done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="serial" className="text-right">
                            Serial Number
                        </Label>
                        <Input id="serial" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="asset-name" className="text-right">
                            Asset Name
                        </Label>
                        <Input id="asset-name" className="col-span-3" />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="asset-type" className="text-right">
                            Asset Type
                        </Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-32">
                                    - Select -
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>ASSETS</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Monitor</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        System Unit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Laptop</DropdownMenuItem>
                                    <DropdownMenuItem>Server</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>UPS</DropdownMenuItem>

                                    <DropdownMenuItem>Printer</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>iPad</DropdownMenuItem>
                                <DropdownMenuItem>Smarthphone</DropdownMenuItem>
                                <DropdownMenuItem>Accessories</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="asset-type" className="text-right">
                            Date Acquired
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-32 justify-start text-left font-normal',
                                        !date && 'text-muted-foreground',
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? (
                                        format(date, 'PPP')
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
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="asset-type" className="text-right">
                            Status
                        </Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-32">
                                    - Select -
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>STATUS</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Available</DropdownMenuItem>
                                <DropdownMenuItem>Deployed</DropdownMenuItem>
                                <DropdownMenuItem>
                                    Decommissioned
                                </DropdownMenuItem>
                                <DropdownMenuItem>Listed</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="asset-type" className="text-right">
                            Deployed Date
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-32 justify-start text-left font-normal',
                                        !date && 'text-muted-foreground',
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? (
                                        format(date, 'PPP')
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
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="asset-type" className="text-right">
                            User Incharge
                        </Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-64">
                                    - Select -
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>STATUS</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Available</DropdownMenuItem>
                                <DropdownMenuItem>Deployed</DropdownMenuItem>
                                <DropdownMenuItem>
                                    Decommissioned
                                </DropdownMenuItem>
                                <DropdownMenuItem>Listed</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="grid grid-cols-4 items-baseline gap-4">
                        <Label htmlFor="asset-type" className="text-right">
                            Remarks
                        </Label>
                        <Textarea className="h-60 w-64" />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        className="bg-green-700 text-white hover:bg-green-800 hover:text-white"
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

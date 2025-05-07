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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { Hammer } from 'lucide-react';
import { useState } from 'react';

export function AddRepairHistory({ assetId }) {
    const [selectedRstatus, setSelectedRtatus] = useState('- Select -');
    const { toast } = useToast();

    const handleSelectRstatus = (type) => {
        setSelectedRtatus(type);
        setData('repair_status', type);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        inventory_id: assetId,
        issue_description: '',
        repair_status: '',
        repaired_by: '',
        repair_notes: '',
    });

    const handleSubmit = (e) => {
        console.log('DATA SA REPAIR HISTORY', data);
        e.preventDefault();
        post('/repair', {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Successfully added the record.',
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
    const repairStatus = [
        'Pending',
        'In Progress',
        'Waiting for Parts',
        'Repaired',
        'Unrepairable',
        'Cancelled',
        'Under Warranty',
        'Completed',
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-gray-600 text-white hover:bg-gray-700">
                    <Hammer />
                    Add Repair
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Repair History</DialogTitle>
                    <DialogDescription>
                        Add a repair history for the asset.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* ISSUE DESCRIPTION INPUT FIELD */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="issueDescription"
                                className="text-right"
                            >
                                Issue Description
                            </Label>
                            <Input
                                id="issueDescription"
                                value={data.issue_description}
                                onChange={(e) =>
                                    setData('issue_description', e.target.value)
                                }
                                className="col-span-3"
                            />
                            {errors.issue_description && (
                                <p className="text-red-500">
                                    {errors.issue_description}
                                </p>
                            )}
                        </div>

                        {/*
                            REPAIR STATUS DROPDOWN
                         */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Repair Status
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-32">
                                        {selectedRstatus}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>
                                        STATUS
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {repairStatus.map((type) => (
                                            <DropdownMenuItem
                                                key={type}
                                                onClick={() =>
                                                    handleSelectRstatus(type)
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

                        {/* REPAIRED BY INPUT FIELD */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="repairedBy" className="text-right">
                                Repaired By
                            </Label>
                            <Input
                                id="repairedBy"
                                value={data.repaired_by}
                                onChange={(e) =>
                                    setData('repaired_by', e.target.value)
                                }
                                className="col-span-3"
                            />
                            {errors.repaired_by && (
                                <p className="text-red-500">
                                    {errors.repaired_by}
                                </p>
                            )}
                        </div>

                        {/* REPAIR NOTES */}
                        <div className="grid grid-cols-4 items-baseline gap-4">
                            <Label htmlFor="repairNotes" className="text-right">
                                Remarks
                            </Label>
                            <Textarea
                                id="repairNotes"
                                className="col-span-3 h-20"
                                value={data.repair_notes}
                                onChange={(e) =>
                                    setData('repair_notes', e.target.value)
                                }
                            />
                            {errors.repair_notes && (
                                <p className="text-red-500">
                                    {errors.repair_notes}
                                </p>
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
                            {processing ? 'Adding Record...' : 'Add Record'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

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
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserPlus } from 'lucide-react';

export function AddEmployee() {
    return (
        <Dialog>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button
                                className="bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
                                variant="outline"
                            >
                                <UserPlus />
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent className="bg-neutral-700">
                        <p>Add Employee</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add device here</DialogTitle>
                    <DialogDescription>
                        Fill in the details for device
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4"></div>
                    <div className="grid grid-cols-4 items-center gap-4"></div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

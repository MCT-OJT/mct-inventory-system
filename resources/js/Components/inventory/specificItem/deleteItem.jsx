import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import { useToast } from '@/hooks/use-toast';
export function DeleteItem({ id }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.delete(`/inventory/${id}`, {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Successfully deleted item.',
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
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() => setOpen(true)}
                >
                    <Trash2 /> Delete Item
                </Button>
            </DialogTrigger>
            <DialogContent className="w-64">
                <DialogHeader>
                    <DialogTitle>Delete Item</DialogTitle>
                    <DialogDescription>
                        Are you sure to delete this item?
                    </DialogDescription>
                    <div className="flex justify-center">
                        <Button
                            className="ml-3 bg-red-600 text-white hover:bg-red-700"
                            onClick={handleSubmit}
                        >
                            Yes
                        </Button>
                        <Button
                            className="ml-3 bg-gray-600 text-white hover:bg-gray-700"
                            onClick={() => setOpen(false)}
                        >
                            No
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

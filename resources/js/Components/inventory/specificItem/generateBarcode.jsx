import { Button } from '@/components/ui/button';
import { ImageDown } from 'lucide-react';

export function GenerateBarcode({ id }) {
    return (
        <Button className="bg-green-600 text-white hover:bg-green-700">
            <ImageDown /> Generate
        </Button>
    );
}

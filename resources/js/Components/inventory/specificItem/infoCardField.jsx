import { Label } from '@/components/ui/label';

export default function InfoCardField({ label = ' - ', value = 'N/A' }) {
    return (
        <div>
            <Label className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {label}
            </Label>
            <div className="font-medium text-gray-900 dark:text-white">
                {value}
            </div>
        </div>
    );
}

import { cn } from '@/lib/utils';

export default function Status({ condition, className }) {
    return (
        <div
            className={cn(
                'h-20 w-fit rounded-md border border-neutral-100 px-6 py-6 text-center shadow dark:border-neutral-500 dark:bg-neutral-600',
                className,
            )}
        >
            {condition === 'Available' ? (
                <span className="block text-lg font-bold text-green-600">
                    AVAILABLE
                </span>
            ) : condition === 'Deployed' ? (
                <span className="block text-lg font-bold text-blue-600">
                    DEPLOYED
                </span>
            ) : condition === 'Decommissioned' ? (
                <span className="block text-lg font-bold text-gray-600">
                    DECOMMISSIONED
                </span>
            ) : condition === 'Listed' ? (
                <span className="block text-lg font-bold text-yellow-600">
                    LISTED
                </span>
            ) : (
                <span className="block text-lg font-bold text-gray-400">
                    {' '}
                    N/A{' '}
                </span>
            )}
        </div>
    );
}

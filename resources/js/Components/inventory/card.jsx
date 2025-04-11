import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Card({
    activeColor,
    iconBg,
    Icon,
    status,
    count,
    lastUpdated,
    onClick,
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={onClick}
                        className={`flex flex-1 items-center justify-between rounded-2xl bg-white p-7 shadow transition-all hover:shadow-xl focus:ring-4 ${activeColor} active:scale-95`}
                    >
                        <div className="text-left">
                            <div
                                className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${iconBg}`}
                            >
                                {Icon}
                            </div>
                            <p className="text-4xl font-bold text-black dark:text-white">
                                {count}
                            </p>
                            <p className="text-l font-bold text-black dark:text-white">
                                {status}
                            </p>

                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                Last Updated: {lastUpdated}
                            </p>
                        </div>
                    </button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-600">
                    <p>Filter by {status} </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

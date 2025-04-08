import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function InfoCard({
    LabelIcon,
    label,
    children,
    className,
    contentClassName,
    ...props
}) {
    return (
        <Card className={cn('dark:bg-neutral-800', className)} {...props}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-medium">
                    {LabelIcon && <LabelIcon className="text-primary" />}
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent
                className={cn('grid grid-cols-2 gap-4', contentClassName)}
            >
                {children}
            </CardContent>
        </Card>
    );
}

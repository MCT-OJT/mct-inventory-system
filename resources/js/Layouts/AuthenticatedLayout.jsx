import SideBar, { SidebarItem } from '@/Components/SideBar';
import { Toaster } from '@/components/ui/toaster';
import { usePage } from '@inertiajs/react';
import { BookPlus, PackageCheck } from 'lucide-react';

export default function AuthenticatedLayout({ children }) {
    const { url } = usePage();

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <SideBar>
                <SidebarItem
                    icon={<PackageCheck size={20} />}
                    text="Inventory"
                    href={route('inventory.index')}
                    active={url === '/inventory'}
                />
                <SidebarItem
                    icon={<BookPlus size={20} />}
                    text="Metadata"
                    href={route('metadata.index')}
                    active={url === '/metadata'}
                />
            </SideBar>
            <main className="flex-1">{children}</main>
            <Toaster />
        </div>
    );
}

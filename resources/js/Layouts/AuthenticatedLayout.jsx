import SideBar, { SidebarItem } from '@/Components/SideBar';
import { usePage } from '@inertiajs/react';
import { HandCoins, LayoutDashboard, PackageCheck } from 'lucide-react';

export default function AuthenticatedLayout({ children }) {
    const { url } = usePage();

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <SideBar>
                <SidebarItem
                    icon={<LayoutDashboard size={20} />}
                    text="Dashboard"
                    href={route('dashboard')}
                    active={url === '/dashboard'}
                />
                <SidebarItem
                    icon={<PackageCheck size={20} />}
                    text="Inventory"
                    href={route('inventory')}
                    active={url === '/inventory'}
                />
                <SidebarItem
                    icon={<HandCoins size={20} />}
                    text="Sales"
                    href={route('sales')}
                    active={url === '/sales'}
                />
            </SideBar>
            <main>{children}</main>
        </div>
    );
}

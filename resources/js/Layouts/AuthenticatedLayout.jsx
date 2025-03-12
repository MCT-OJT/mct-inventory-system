import SideBar, { SidebarItem } from '@/Components/SideBar';
import { Home, LayoutDashboard, StickyNote } from 'lucide-react';

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <SideBar>
                <SidebarItem icon={<Home size={20} />} text="Home" alert />
                <SidebarItem
                    icon={<LayoutDashboard size={20} />}
                    text="Dashboard"
                    active
                />
                <SidebarItem
                    icon={<StickyNote size={20} />}
                    text="Projects"
                    alert
                />
            </SideBar>
            <main>{children}</main>
        </div>
    );
}

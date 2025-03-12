import { usePage } from '@inertiajs/react';
import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react';
import { createContext, useContext, useState } from 'react';
import ApplicationLogo from './ApplicationLogo';

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    const user = usePage().props.auth.user;

    return (
        <>
            <aside className="h-screen">
                <nav className="bg-darkBlue flex h-full flex-col border-r shadow-sm">
                    <div className="flex items-center justify-between p-4 pb-2">
                        <ApplicationLogo expanded={expanded} />
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="bg-lightDarkBlue Bg active:bg-darkerPrimary group rounded-lg p-1.5 duration-150 hover:bg-primary hover:transition"
                        >
                            {expanded ? (
                                <ChevronFirst className="text-lighterDarkBlue group-hover:text-white" />
                            ) : (
                                <ChevronLast className="text-lighterDarkBlue group-hover:text-white" />
                            )}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="flex border-t p-3">
                        {/* <img src={profile} className="h-10 w-10 rounded-md" /> */}
                        <div
                            className={`flex items-center justify-between overflow-hidden transition-all duration-150 ease-linear ${expanded ? 'ml-3 w-60' : 'w-0'} `}
                        >
                            <div className="leading-4">
                                <h4 className="font-semibold">{user.name}</h4>
                                <span className="text-xs text-gray-600">
                                    {user.email}
                                </span>
                            </div>
                            <MoreVertical size={20} />
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}

export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext);
    return (
        <li
            className={`group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors duration-100 ${active ? 'bg-primary text-white' : 'hover:bg-lightDarkBlue text-gray-600 hover:text-primary'}`}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all duration-100 ease-linear ${expanded ? 'ml-3 w-60' : 'w-0'}`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 h-2 w-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`}
                ></div>
            )}

            {!expanded && (
                <div
                    className={`invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-indigo-100 px-2 py-1 text-sm text-indigo-800 opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
                >
                    {text}
                </div>
            )}
        </li>
    );
}

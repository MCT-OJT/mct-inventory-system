import { Link, usePage } from '@inertiajs/react';
import { ChevronFirst, ChevronLast } from 'lucide-react';
import { createContext, useContext, useState } from 'react';
import ApplicationLogo from './ApplicationLogo';

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    const user = usePage().props.auth.user;

    return (
        <>
            <aside className="h-screen">
                <nav className="flex h-full flex-col border-r bg-darkBlue shadow-sm">
                    <div className="flex items-center justify-between p-4 pb-2">
                        <ApplicationLogo expanded={expanded} />
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="Bg group rounded-lg bg-lightDarkBlue p-1.5 duration-150 hover:bg-primary hover:transition active:bg-darkerPrimary"
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

                    <div className="flex w-full border-t p-3">
                        <div
                            className={`overflow-hidden transition-[margin,width] duration-300 ease-in-out ${
                                expanded ? 'ml-3 w-60' : 'ml-0 w-0'
                            }`}
                        >
                            <div
                                className={`transition-opacity delay-100 duration-300 ${
                                    expanded ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <h4 className="whitespace-nowrap font-semibold text-white">
                                    {user.name}
                                </h4>
                                <span className="whitespace-nowrap text-xs text-gray-300">
                                    {user.email}
                                </span>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="mt-2 w-full rounded-md bg-primary p-1 text-center text-sm font-bold text-white hover:bg-darkerPrimary"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}

export function SidebarItem({ icon, text, active, alert, href }) {
    const { expanded } = useContext(SidebarContext);

    return (
        <Link
            href={href}
            className={`group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors duration-100 ${
                active
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-lightDarkBlue hover:text-primary'
            }`}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all duration-100 ease-linear ${
                    expanded ? 'ml-3 w-60' : 'w-0'
                }`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 h-2 w-2 rounded bg-primary ${
                        expanded ? '' : 'top-2'
                    }`}
                ></div>
            )}
            {!expanded && (
                <div
                    className={`invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-primary px-2 py-1 text-sm text-white opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
                >
                    {text}
                </div>
            )}
        </Link>
    );
}

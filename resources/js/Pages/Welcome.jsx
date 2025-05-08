import { Card, CardContent } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { PackagePlus } from 'lucide-react';
import logo from '../../../public/assets/logo-black.png';

export default function Welcome() {
    const links = [
        { label: 'Inventory System', route: route('login') },
        { label: 'Soon...' },
        { label: 'Soon...' },
    ];

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted dark:bg-black">
            <Head title="Welcome" />

            <header className="mb-12 text-center">
                <img src={logo} alt="Logo" className="mx-auto mb-4 w-40" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    IT Integrated Systems
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage. Track. Maintain.
                </p>
            </header>
            <div className="w-full bg-primary py-16">
                <div className="mx-auto grid max-w-6xl justify-center gap-6 px-4 sm:grid-cols-2 md:grid-cols-3">
                    {links.map((link, index) => (
                        <Link href={link.route ?? '#'} key={index}>
                            <Card className="w-60 cursor-pointer transition-shadow duration-200 hover:shadow-xl">
                                <CardContent className="flex flex-col items-center p-6 text-center">
                                    <PackagePlus className="text-primary" />
                                    <h2 className="text-lg font-extrabold text-black dark:text-white">
                                        {link.label}
                                    </h2>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

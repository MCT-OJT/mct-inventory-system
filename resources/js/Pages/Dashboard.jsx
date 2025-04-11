import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', file);

        console.log('Uploading file...');

        router.post('/upload', data, {
            onFinish: () => {
                console.log('Upload finished.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <button type="submit">Uploads</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

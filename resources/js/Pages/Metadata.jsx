import { AddAssetDropdowns } from '@/Components/metadata/addAssetDropdowns';
import { AddEmployee } from '@/Components/metadata/addEmployee';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
export default function Metadata() {
    return (
        <AuthenticatedLayout>
            <Head title="Sales" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex gap-4">
                        <AddAssetDropdowns />
                        <AddEmployee />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

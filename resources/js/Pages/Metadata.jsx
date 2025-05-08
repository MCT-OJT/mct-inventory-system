import { AddAssetDropdowns } from '@/Components/metadata/addAssetDropdowns';
import { AddEmployee } from '@/Components/metadata/addEmployee';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Register from './Auth/Register';
export default function Metadata() {
    return (
        <AuthenticatedLayout>
            <Head title="Sales" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="flex w-full flex-col gap-5">
                        <AddAssetDropdowns />
                        <div className="flex w-full gap-3">
                            <Register />
                            <AddEmployee />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';

export default function Inventory({ assets }) {
    console.log('sepecifc render', assets);
    return (
        <AuthenticatedLayout>
            <Head title={`${assets.asset_tag}`} />
            <div className="m-10 rounded-lg border bg-white p-7 shadow">
                <h1 className="text-3xl font-bold tracking-tight">
                    {assets.asset_name}
                </h1>
                <p className="text-lg">Asset Tag: {assets.asset_tag}</p>
                <p className="text-lg">Type: {assets.asset_type}</p>
                <p className="text-lg">Status: {assets.status}</p>
                <p className="text-lg">User Incharge: {assets.user_incharge}</p>

                <Button className="mt-5" onClick={() => history.back()}>
                    Back
                </Button>
            </div>
        </AuthenticatedLayout>
    );
}

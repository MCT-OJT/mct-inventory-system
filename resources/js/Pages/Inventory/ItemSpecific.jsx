import { DeleteItem } from '@/Components/inventory/specificItem/deleteItem';
import { EditItem } from '@/Components/inventory/specificItem/editItem';
import InfoCard from '@/Components/inventory/specificItem/infoCard';
import InfoCardField from '@/Components/inventory/specificItem/infoCardField';
import Status from '@/Components/inventory/specificItem/status';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { getDateString } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { BookUser, History, Images, OctagonAlert, Undo2 } from 'lucide-react';
export default function Inventory({ asset }) {
    console.log('asset SULOD', asset);
    const formattedCreatedAt = getDateString(asset.created_at);
    const formattedUpdatedAt = getDateString(asset.updated_at);
    const formattedDateAcquired = getDateString(asset.date_acquired);
    const formattedDeployedDate = asset.deployed_date
        ? getDateString(asset.deployed_date)
        : 'N/A';
    return (
        <AuthenticatedLayout>
            <Head title={`${asset.asset_tag}`} />
            <div className="ml-12 mr-12 flex justify-between">
                <Button className="mb-4 mt-12" onClick={() => history.back()}>
                    <Undo2 />
                    Back
                </Button>
                <div className="mt-12">
                    <EditItem asset={asset} />
                    <DeleteItem id={asset.id} />
                </div>
            </div>

            <div className="ml-12 mr-12 grid auto-rows-fr grid-rows-2 gap-6 md:grid-cols-3">
                <InfoCard
                    LabelIcon={OctagonAlert}
                    label="Asset Details"
                    className="row-span-2"
                >
                    <InfoCardField label="Asset Tag" value={asset.asset_tag} />
                    <InfoCardField
                        label="Asset Brand"
                        value={asset.asset_brand}
                    />
                    <InfoCardField
                        label="Asset Type"
                        value={asset.asset_type}
                    />
                    <InfoCardField
                        label="Serial Number"
                        value={asset.serial_number}
                    />
                    <InfoCardField
                        label="Date Acquired"
                        value={formattedDateAcquired}
                    />
                    <InfoCardField
                        label="Record Created"
                        value={formattedCreatedAt}
                    />
                    <InfoCardField
                        label="Record Updated"
                        value={formattedUpdatedAt}
                    />
                    <div className="h-40 space-y-2">
                        <Label className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Asset Status
                        </Label>
                        <Status condition={asset.status} />
                    </div>
                </InfoCard>
                <div className="row-span-2 flex h-full flex-col gap-6">
                    <InfoCard
                        LabelIcon={BookUser}
                        label="Deployment Details"
                        className="row-span-2 h-2/3"
                    >
                        <InfoCardField
                            label="Deployed Date"
                            value={formattedDeployedDate ?? 'N/A'}
                        />
                        <InfoCardField
                            label="ID Number"
                            value={asset.employee?.id_number ?? 'N/A'}
                        />
                        <InfoCardField
                            label="User Incharge"
                            value={asset.employee?.name ?? 'N/A'}
                        />
                        <InfoCardField
                            label="Department"
                            value={asset.employee?.department ?? 'N/A'}
                        />
                        <InfoCardField label="Remarks" value={asset.remarks} />
                    </InfoCard>
                    <InfoCard
                        LabelIcon={History}
                        label="Repair History"
                        className="row-span-2 h-1/3"
                    >
                        <InfoCardField
                            label=""
                            value={'TEST: Christian Jericho'}
                        />
                        <InfoCardField label="" value={'TEST: May 16, 2025'} />
                    </InfoCard>
                </div>
                <InfoCard
                    LabelIcon={Images}
                    label="Asset Image"
                    className="row-span-2"
                ></InfoCard>
            </div>
        </AuthenticatedLayout>
    );
}

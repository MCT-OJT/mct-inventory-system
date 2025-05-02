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

export default function Inventory({
    inventory,
    employee,
    assets,
    specificAsset,
    assetImage,
}) {
    // console.log('inventory:', inventory);
    // console.log('employee:', employee);
    // console.log('assets:', assets);
    // console.log('specificAsset:', specificAsset.asset?.asset_image);

    const formattedCreatedAt = getDateString(specificAsset.created_at);
    const formattedUpdatedAt = getDateString(specificAsset.updated_at);
    const formattedDateAcquired = getDateString(specificAsset.date_acquired);
    const formattedDeployedDate = specificAsset.deployed_date
        ? getDateString(specificAsset.deployed_date)
        : 'N/A';
    return (
        <AuthenticatedLayout>
            <Head title={`${specificAsset.asset_tag}`} />
            <div className="ml-12 mr-12 flex justify-between">
                <Button className="mb-4 mt-12" onClick={() => history.back()}>
                    <Undo2 />
                    Back
                </Button>
                <div className="mt-12">
                    <EditItem
                        inventory={inventory}
                        employee={employee}
                        assets={assets}
                        specificAsset={specificAsset}
                    />
                    <DeleteItem id={specificAsset.id} />
                </div>
            </div>

            <div className="ml-12 mr-12 grid auto-rows-fr grid-rows-2 gap-6 md:grid-cols-3">
                <InfoCard
                    LabelIcon={OctagonAlert}
                    label="Asset Details"
                    className="row-span-2"
                >
                    <InfoCardField
                        label="Asset Tag"
                        value={specificAsset.asset_tag}
                    />
                    <InfoCardField
                        label="Asset Brand"
                        value={specificAsset.asset?.asset_brand}
                    />
                    <InfoCardField
                        label="Asset Type"
                        value={specificAsset.asset?.asset_type}
                    />
                    <InfoCardField
                        label="Serial Number"
                        value={specificAsset.serial_number}
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
                        <Status condition={specificAsset.status} />
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
                            value={specificAsset.employee?.id_number ?? 'N/A'}
                        />
                        <InfoCardField
                            label="User Incharge"
                            value={specificAsset.employee?.name ?? 'N/A'}
                        />
                        <InfoCardField
                            label="Department"
                            value={specificAsset.employee?.department ?? 'N/A'}
                        />
                        <InfoCardField
                            label="Remarks"
                            value={specificAsset.remarks}
                        />
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
                    fullContent
                >
                    <img
                        src={assetImage}
                        alt="NAS Image"
                        className="h-auto w-full object-contain"
                    />
                </InfoCard>
            </div>
        </AuthenticatedLayout>
    );
}

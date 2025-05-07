import { DeleteItem } from '@/Components/inventory/specificItem/deleteItem';
import { EditItem } from '@/Components/inventory/specificItem/editItem';
import { GenerateQRcode } from '@/Components/inventory/specificItem/generateQRcode';
import InfoCard from '@/Components/inventory/specificItem/infoCard';
import InfoCardField from '@/Components/inventory/specificItem/infoCardField';
import Status from '@/Components/inventory/specificItem/status';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { getDateString } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { BookUser, History, Images, OctagonAlert, Undo2 } from 'lucide-react';

import { Input } from '@/components/ui/input';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

export default function Inventory({
    inventory,
    employee,
    assets,
    specificAsset,
    assetImage,
}) {
    console.log('REPAIR HISTORY =========>:', specificAsset);

    const formattedCreatedAt = getDateString(specificAsset.created_at);
    const formattedUpdatedAt = getDateString(specificAsset.updated_at);
    const formattedDateAcquired = getDateString(specificAsset.date_acquired);
    const formattedDeployedDate = specificAsset.deployed_date
        ? getDateString(specificAsset.deployed_date)
        : 'N/A';

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredAssets = specificAsset.repair_histories.filter((asset) =>
        Object.values(asset).some((value) =>
            value?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );

    const totalPages = Math.ceil(filteredAssets.length / 3);
    const startIndex = (currentPage - 1) * 3;
    const paginatedAssets = filteredAssets.slice(startIndex, startIndex + 3);

    function highlightMatch(text, query) {
        if (!query) return text;

        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <mark key={i} className="bg-yellow-200">
                    {part}
                </mark>
            ) : (
                part
            ),
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title={`${specificAsset.asset_tag}`} />
            <div className="ml-12 mr-12 flex justify-between">
                <Button className="mb-4 mt-12" onClick={() => history.back()}>
                    <Undo2 />
                    Back
                </Button>
                <div className="ml-12 mt-12 flex gap-4">
                    <div>
                        <GenerateQRcode
                            assetId={specificAsset.id}
                            assetTag={specificAsset.asset_tag}
                        />
                    </div>
                    <div>
                        <EditItem
                            inventory={inventory}
                            employee={employee}
                            assets={assets}
                            specificAsset={specificAsset}
                        />
                    </div>
                    <div>
                        <DeleteItem id={specificAsset.id} />
                    </div>
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
                        className="row-span-2 h-full"
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
                </div>
                <InfoCard
                    LabelIcon={Images}
                    label="Asset Image"
                    className="row-span-2"
                    fullContent
                    contentClassName="h-full"
                >
                    <img
                        src={assetImage}
                        alt="NAS Image"
                        className="h-72 w-full object-contain"
                    />
                </InfoCard>
            </div>

            {/*
                ==========> CODE HERE
             */}
            <div className="m-10 rounded-lg border bg-white p-7 shadow">
                <div className="flex items-center justify-between">
                    <div className="mb-3">
                        <div className="flex items-center gap-2 text-xl font-medium">
                            <History className="text-primary" />
                            <h1 className="text-2xl font-bold tracking-tight">
                                Repair History
                            </h1>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Input
                            type="text"
                            placeholder="Search"
                            className="w-52"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <Table>
                    <TableCaption>List of current IT assets.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Reported Date</TableHead>
                            <TableHead>Issue Description</TableHead>
                            <TableHead>Repair Status</TableHead>
                            <TableHead>Repaired By</TableHead>
                            <TableHead>Repair Notes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedAssets.map((history) => (
                            <TableRow
                                key={history.id}
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                <TableCell>
                                    {highlightMatch(
                                        getDateString(history.created_at) ?? '',
                                        searchQuery,
                                    )}
                                </TableCell>

                                <TableCell>
                                    {highlightMatch(
                                        history.issue_description ?? '',
                                        searchQuery,
                                    )}
                                </TableCell>
                                <TableCell>
                                    {highlightMatch(
                                        history.repair_status ?? '',
                                        searchQuery,
                                    )}
                                </TableCell>

                                <TableCell>
                                    {highlightMatch(
                                        history.repaired_by ?? '',
                                        searchQuery,
                                    )}
                                </TableCell>

                                <TableCell>
                                    {highlightMatch(
                                        history.repair_notes ?? '',
                                        searchQuery,
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination className="mt-5">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1),
                                    )
                                }
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={
                                        currentPage === i + 1 ? 'font-bold' : ''
                                    }
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages),
                                    )
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </AuthenticatedLayout>
    );
}

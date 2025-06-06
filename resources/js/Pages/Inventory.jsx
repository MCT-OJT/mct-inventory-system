import { AddItem } from '@/Components/inventory/addItem';
import Card from '@/Components/inventory/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';

import ScanQRCode from '@/Components/inventory/scanQrCode';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { getDateString } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import {
    Archive,
    CircleCheckBig,
    FileDown,
    MonitorCheck,
    Tag,
} from 'lucide-react';
import { useState } from 'react';

export default function Inventory({ inventory, employee, assets }) {
    console.log('INVENTORY DATA =======>>>>>>>>', inventory);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);
    const dateNow = new Date().toISOString().split('T')[0];

    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('My Data');

        worksheet.columns = [
            { header: 'Asset Tag', key: 'asset_tag', width: 20 },
            { header: 'Serial Number', key: 'serial_number', width: 30 },
            { header: 'Date Acquired', key: 'date_acquired', width: 20 },
            { header: 'Status', key: 'status', width: 20 },
            { header: 'Remarks', key: 'remarks', width: 40 },
            { header: 'Record Created', key: 'created_at', width: 20 },
            { header: 'Updated At', key: 'updated_at', width: 20 },
        ];

        inventory.forEach((item) => {
            worksheet.addRow({
                ...item,
                date_acquired: getDateString(item.date_acquired),
                created_at: getDateString(item.created_at),
                updated_at: getDateString(item.updated_at),
            });
        });

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFCCE5FF' },
            };
        });

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `INVENTORY DATA AS OF ${dateNow}.xlsx`);
    };

    const getStatusLastUpdated = (status) => {
        const filteredAssets = inventory
            .filter((asset) => asset.status === status)
            .map((asset) => new Date(asset.updated_at));

        if (filteredAssets.length === 0) return 'No updates';

        const latestUpdate = new Date(Math.max(...filteredAssets));
        return latestUpdate.toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Manila',
        });
    };

    const getStatusCount = (status) =>
        inventory.filter((asset) => asset.status === status).length;

    const handleCardClick = (status) => {
        setSelectedStatus(status === selectedStatus ? null : status);
        setCurrentPage(1);
    };

    const filteredAssets = inventory.filter(
        (asset) =>
            (selectedStatus ? asset.status === selectedStatus : true) &&
            Object.values(asset).some((value) =>
                value
                    ?.toString()
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
            ),
    );

    const totalPages = Math.ceil(filteredAssets.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedAssets = filteredAssets.slice(
        startIndex,
        startIndex + rowsPerPage,
    );

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
            <Head title="Inventory" />
            <div className="m-10 flex gap-4">
                <Card
                    Icon={<CircleCheckBig className="text-green-600" />}
                    status={'Available assets'}
                    count={getStatusCount('Available')}
                    lastUpdated={getStatusLastUpdated('Available')}
                    iconBg={'bg-green-100'}
                    activeColor={
                        selectedStatus === 'Available'
                            ? 'focus:ring-green-300'
                            : 'focus:ring-transparent'
                    }
                    onClick={() => handleCardClick('Available')}
                />
                <Card
                    Icon={<MonitorCheck className="text-blue-600" />}
                    status={'Deployed assets'}
                    count={getStatusCount('Deployed')}
                    lastUpdated={getStatusLastUpdated('Deployed')}
                    iconBg={'bg-blue-100'}
                    activeColor={
                        selectedStatus === 'Deployed'
                            ? 'focus:ring-blue-300'
                            : 'focus:ring-transparent'
                    }
                    onClick={() => handleCardClick('Deployed')}
                />
                <Card
                    Icon={<Archive className="text-red-600" />}
                    status={'Decommissioned assets'}
                    count={getStatusCount('Decommissioned')}
                    lastUpdated={getStatusLastUpdated('Decommissioned')}
                    iconBg={'bg-red-100'}
                    activeColor={
                        selectedStatus === 'Decommissioned'
                            ? 'focus:ring-red-300'
                            : 'focus:ring-transparent'
                    }
                    onClick={() => handleCardClick('Decommissioned')}
                />
                <Card
                    Icon={<Tag className="text-yellow-600" />}
                    status={'Listed assets'}
                    count={getStatusCount('Listed')}
                    lastUpdated={getStatusLastUpdated('Listed')}
                    iconBg={'bg-yellow-100'}
                    activeColor={
                        selectedStatus === 'Listed'
                            ? 'focus:ring-yellow-300'
                            : 'focus:ring-transparent'
                    }
                    onClick={() => handleCardClick('Listed')}
                />
            </div>

            <div className="m-10 rounded-lg border bg-white p-7 shadow">
                <div className="flex items-center justify-between">
                    <div className="mb-3">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Inventory
                        </h1>
                        <h1 className="text-lg tracking-tight">
                            Manage your inventory here
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <Input
                            type="text"
                            placeholder="Search"
                            className="w-52"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <ScanQRCode />
                        <Button
                            onClick={exportToExcel}
                            className="bg-green-700 text-white hover:bg-green-800"
                        >
                            <FileDown />
                            Export Data
                        </Button>

                        <AddItem employee={employee} assets={assets} />
                    </div>
                </div>
                <Table>
                    <TableCaption>List of current IT assets.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Asset Tag</TableHead>
                            <TableHead>Asset Brand</TableHead>
                            <TableHead>Asset Type</TableHead>
                            <TableHead>Status</TableHead>
                            {![
                                'Available',
                                'Decommissioned',
                                'Listed',
                            ].includes(selectedStatus) && (
                                <TableHead>User Incharge</TableHead>
                            )}{' '}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedAssets.map((asset) => (
                            <TableRow
                                key={asset.id}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() =>
                                    router.visit(`/inventory/${asset.id}`)
                                }
                            >
                                <TableCell>
                                    {highlightMatch(
                                        asset.asset_tag || '',
                                        searchQuery,
                                    )}
                                </TableCell>
                                <TableCell>
                                    {highlightMatch(
                                        asset.asset?.asset_brand || '',
                                        searchQuery,
                                    )}
                                </TableCell>
                                <TableCell>
                                    {highlightMatch(
                                        asset.asset?.asset_type || '',
                                        searchQuery,
                                    )}
                                </TableCell>
                                <TableCell>
                                    {highlightMatch(
                                        asset.status || '',
                                        searchQuery,
                                    )}
                                </TableCell>
                                {![
                                    'Available',
                                    'Decommissioned',
                                    'Listed',
                                ].includes(selectedStatus) && (
                                    <TableCell>
                                        {highlightMatch(
                                            asset.employee?.name || '',
                                            searchQuery,
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex items-center space-x-2">
                    <label className="hidden text-sm font-normal md:inline">
                        Rows per page
                    </label>
                    <Select
                        value={String(rowsPerPage)}
                        onValueChange={(value) => {
                            setRowsPerPage(Number(value));
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px] dark:bg-neutral-700">
                            <SelectValue>{rowsPerPage}</SelectValue>
                        </SelectTrigger>
                        <SelectContent
                            side="top"
                            className="dark:bg-neutral-700"
                        >
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

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

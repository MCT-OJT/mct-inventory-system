import { AddItem } from '@/Components/inventory/addItem';
import Card from '@/Components/inventory/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';

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
import { Head } from '@inertiajs/react';
import {
    Archive,
    CircleCheckBig,
    FileDown,
    MonitorCheck,
    Tag,
} from 'lucide-react';
import { useState } from 'react';

export default function Inventory({ inventory, employee, assets }) {
    console.log('KANIANBG JERVIN ASSETS', inventory);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);

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

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
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
                        <Button className="bg-green-700 text-white hover:bg-green-800">
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
                                <TableCell>{asset.asset_tag}</TableCell>
                                <TableCell>
                                    {asset.asset?.asset_brand}
                                </TableCell>
                                <TableCell>{asset.asset?.asset_type}</TableCell>
                                <TableCell>{asset.status}</TableCell>
                                {![
                                    'Available',
                                    'Decommissioned',
                                    'Listed',
                                ].includes(selectedStatus) && (
                                    <TableCell>
                                        {asset.employee?.name || ''}
                                    </TableCell>
                                )}{' '}
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

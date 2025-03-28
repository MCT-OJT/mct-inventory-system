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
import { CircleCheckBig, FileDown } from 'lucide-react';
import { useState } from 'react';

export default function Inventory({ assets }) {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAssets = assets.filter((asset) =>
        Object.values(asset).some((value) =>
            value?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
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
                <Card Icon={<CircleCheckBig />} title="asd" value="asd" />
                <Card />
                <Card />
                <Card />
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
                        <AddItem />
                    </div>
                </div>
                <Table>
                    <TableCaption>List of current IT assets.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Asset Tag</TableHead>
                            <TableHead>Asset Name</TableHead>
                            <TableHead>Asset Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>User Incharge</TableHead>
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
                                <TableCell>{asset.asset_name}</TableCell>
                                <TableCell>{asset.asset_type}</TableCell>
                                <TableCell>{asset.status}</TableCell>
                                <TableCell>{asset.user_incharge}</TableCell>
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

import Card from '@/Components/inventory/card';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { CircleCheckBig, FileDown } from 'lucide-react';

import { AddItem } from '@/Components/inventory/addItem';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
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

export default function Inventory() {
    //! DUMMY DATA FOR RENDERING PURPOSE, DYNAMIC SOON
    const assets = [
        {
            assetTag: 'MCT25-PRI001',
            assetName: 'GIANT',
            assetType: 'MNT',
            status: 'Available',
            userIncharge: 'Lymuel Bracamonte',
        },
        {
            assetTag: 'MCT25-PRI001',
            assetName: 'GIANT',
            assetType: 'MNT',
            status: 'Available',
            userIncharge: 'Lymuel Bracamonte',
        },
        {
            assetTag: 'MCT25-PRI001',
            assetName: 'GIANT',
            assetType: 'MNT',
            status: 'Available',
            userIncharge: 'Lymuel Bracamonte',
        },
        {
            assetTag: 'MCT25-PRI001',
            assetName: 'GIANT',
            assetType: 'MNT',
            status: 'Available',
            userIncharge: 'Lymuel Bracamonte',
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="m-10 flex gap-4">
                <Card
                    Icon={<CircleCheckBig />}
                    title="asd"
                    value="asd"
                    valuePostfix="asd"
                    increase="asd"
                    increasePostfix="asd"
                    description="asd"
                />
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
                            type="email"
                            placeholder="Search"
                            className="w-52"
                        />
                        <Button
                            className="bg-green-700 text-white hover:bg-green-800 hover:text-white"
                            variant="outline"
                        >
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
                        {assets.map((asset) => (
                            <TableRow key={asset.assetTag}>
                                <TableCell>{asset.assetTag}</TableCell>
                                <TableCell>{asset.assetName}</TableCell>
                                <TableCell>{asset.assetType}</TableCell>
                                <TableCell>{asset.status}</TableCell>
                                <TableCell>{asset.userIncharge}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination className="mt-5">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </AuthenticatedLayout>
    );
}

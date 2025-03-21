import Card from '@/Components/inventory/card';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { CircleCheckBig, FileDown } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { AddItem } from '@/Components/inventory/addItem';
export default function Inventory() {
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

            <div className="m-10 rounded-lg border p-7 shadow">
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
                <div className="flex flex-col overflow-x-auto border">
                    <div className="sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="h-1 border-b bg-primary font-medium">
                                        <tr className="">
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-center text-white"
                                            >
                                                Asset Tag
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-center text-white"
                                            >
                                                Asset Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-center text-white"
                                            >
                                                Asset Type
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-center text-white"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-center text-white"
                                            >
                                                User Incharge
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 text-center font-medium">
                                                1
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                Cell
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                Cell
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                Cell
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                Cell
                                            </td>
                                        </tr>
                                        <tr className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 text-center font-medium">
                                                2
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                Cell
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                Cell
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                Cell
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                Cell
                                            </td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="whitespace-nowrap px-6 py-4 text-center font-medium">
                                                3
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                Cell
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                Cell
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                Cell
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                Cell
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

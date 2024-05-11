"use client"
import { useQuery } from "convex/react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { api } from "@/../convex/_generated/api";
import Link from "next/link";
import { Button } from "../ui/button";
import { AxeIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";

export function ProductTable() {

    const products = useQuery(api.products.getAll);
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >العمر</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>الوزن</TableHead>
                        <TableHead>خيارات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products?.map(product => (
                        <TableRow key={product._id}>
                            <TableCell>{product.age}</TableCell>
                            <TableCell>{product.type}</TableCell>
                            <TableCell>{product.weight}</TableCell>
                            <TableCell>
                                <Button variant={"outline"} >
                                    <PlusIcon></PlusIcon>
                                </Button>
                                <Link href={`/dashboard/products/${product._id}`}>
                                    <Button variant={"outline"} >
                                        <PencilIcon></PencilIcon>
                                    </Button>
                                </Link>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
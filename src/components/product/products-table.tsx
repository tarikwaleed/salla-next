"use client"
import { useQuery } from "convex/react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { api } from "@/../convex/_generated/api";
import Link from "next/link";
import { Button } from "../ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";

export function ProductTable({ isAdmin, userId }: { isAdmin: boolean, userId: string | null }) {

    const products = isAdmin ? useQuery(api.products.getAll) : useQuery(api.products.getUserProducts, { userId: userId })
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
                                {isAdmin ?
                                    <Button
                                        title="اضافة الى سله"
                                        variant={"outline"} >
                                        <PlusIcon></PlusIcon>
                                    </Button>
                                    :
                                    <></>
                                }
                                <Link href={`/dashboard/products/${product._id}`}>
                                    <Button
                                        title="تفاصيل المنتج"
                                        variant={"outline"}
                                    >
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
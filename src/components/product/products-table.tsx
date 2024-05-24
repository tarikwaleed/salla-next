"use client"
import { useQuery } from "convex/react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { api } from "@/../convex/_generated/api";
import Link from "next/link";
import { Button } from "../ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { Product } from "@/types/product";

export function ProductTable({ isAdmin, userId }: { isAdmin: boolean, userId: string | null }) {

    const products = isAdmin ? useQuery(api.products.getAll) : useQuery(api.products.getUserProducts, { userId: userId })
    const addProduct = async (raw: any) => {
        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "Apidog/1.0.0 (https://apidog.com)");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${process.env.NEXT_PUBLIC_SALLA_ACCESS_TOKEN}`);


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.salla.dev/admin/v2/products", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    const [currentProductId, setCurrentProductId] = useState<Id<"products">>("j973y6dkzr7yxvyb1f120qypsh6scw8x" as Id<"products">);
    const productDetails = useQuery(api.products.getOneById, { id: currentProductId });

    // Ensure productDetails and urls are defined before mapping
    const images = productDetails?.urls ? productDetails.urls.map((url, index) => {
        return {
            original: `${url}`,
            thumbnail: `${url}`,
            alt: "image",
            default: true,
            sort: 5
        };
    }) : [];

    const handleAddProduct = (productId: Id<"products">, product: Product) => {
        setCurrentProductId(productId);
        console.log(images)
        const raw = JSON.stringify({
            name: `${product.type} ${product.age}`,
            price: product.price,
            product_type: "product",
            quantity: product.quantity,
            "images": [
                {
                    "original": "https://spca.bc.ca/wp-content/uploads/2020/03/lamb-baby-sheep-outdoors-1.jpg",
                    "thumbnail": "https://spca.bc.ca/wp-content/uploads/2020/03/lamb-baby-sheep-outdoors-1.jpg",
                    "alt": "image",
                    "default": true,
                    "sort": 5
                }
            ],
        });
        addProduct(raw);
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >العمر</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>الوزن</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>الكميه</TableHead>
                        <TableHead>خيارات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products?.map(product => (
                        <TableRow key={product._id}>
                            <TableCell>{product.age}</TableCell>
                            <TableCell>{product.type}</TableCell>
                            <TableCell>{product.weight}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>
                                {isAdmin ?
                                    <Button
                                        title="اضافة الى سله"
                                        variant={"outline"}
                                        onClick={() => {
                                            handleAddProduct(product._id, product)

                                        }}
                                    >

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
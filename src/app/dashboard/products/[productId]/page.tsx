"use client"
import { useQuery } from 'convex/react';
import React from 'react'
import { api } from '../../../../../convex/_generated/api';
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card"
import { StarIcon } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type Props = {}

const ProductDetails = ({ params }: { params: any }) => {
    const products = useQuery(api.products.getOneById, { id: params.productId });
    return (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
            <Card className="max-w-sm mx-auto">
                <CardHeader className="aspect-w-3 aspect-h-2">
                    <img
                        alt="Product Image"
                        className="object-cover w-full h-full"
                        height="400"
                        src="/sheep.jpg"
                        style={{
                            aspectRatio: "600/400",
                            objectFit: "cover",
                        }}
                        width="600"
                    />
                </CardHeader>
                <CardContent className="p-6">
                    <CardTitle className="text-2xl font-bold mb-2">خروف ابيض</CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        خروف ابيض
                    </CardDescription>
                </CardContent>
            </Card>
            <div className="grid gap-4 md:gap-10 items-start order-2 md:order-1">
                <div className="hidden md:flex items-start">
                    <div className="grid gap-4">
                        <h1 className="font-bold text-3xl">خروف ابيض كبير </h1>
                        <div>
                            <p>خروف ابيض كبير الحجم وزنه 50 كيلو جرام عمره 4 سنوات</p>
                        </div>
                    </div>
                    <div className="text-4xl font-bold ml-auto">99 ر.س</div>
                </div>
                <Separator />
                <div className="grid gap-4 text-sm leading-loose">
                    <p>
                        Introducing the Acme Prism T-Shirt, a perfect blend of style and comfort for the modern individual. This tee
                        is crafted with a meticulous composition of 60% combed ringspun cotton and 40% polyester jersey, ensuring a
                        soft and breathable fabric that feels gentle against the skin.
                    </p>
                    <p>
                        The design of the Acme Prism T-Shirt is as striking as it is comfortable. The shirt features a unique
                        prism-inspired pattern that adds a modern and eye-catching touch to your ensemble.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
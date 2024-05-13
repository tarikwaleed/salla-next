"use client"
import { useQuery } from 'convex/react';
import React from 'react'
import { api } from '../../../../../convex/_generated/api';
import { Card } from "@/components/ui/card"


const ProductDetails = ({ params }: { params: any }) => {
    const product = useQuery(api.products.getOneById, { id: params.productId });
    return (
        <>
            <div className="container mx-auto mt-8">
            <h1 className='font-bold text-7xl text-right pt-16 pb-16'>تفاصيل المنتج </h1>
                <div className="flex flex-wrap">
                    {/* Product Information Cards */}
                    <div className="w-full sm:w-1/3 px-4 mb-4">
                        <Card>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">نوع المنتج</h2>
                                <p>{product?.data?.type}</p>
                            </div>
                        </Card>
                    </div>
                    <div className="w-full sm:w-1/3 px-4 mb-4">
                        <Card>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">العمر</h2>
                                <p>{product?.data?.age}</p>
                            </div>
                        </Card>
                    </div>
                    <div className="w-full sm:w-1/3 px-4 mb-4">
                        <Card>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">الوزن</h2>
                                <p>{product?.data?.weight}</p>
                            </div>
                        </Card>
                    </div>
                </div>


                <h1 className='font-bold text-7xl text-right pt-32'>الصور</h1>
                <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {product?.urls.map((url, index) => (
                        <Card key={index}>
                            <img src={url} alt={`Product ${index + 1}`} className="w-full h-auto" />
                        </Card>
                    ))}
                </div>

            </div>
        </>


    )
}

export default ProductDetails
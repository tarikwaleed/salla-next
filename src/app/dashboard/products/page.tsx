import ProductsList from '@/components/product/products-list'
import React from 'react'
import { Button } from '@/components/ui/button'
import { AddProductModal } from '@/components/product/add-product-modal'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='pt-20'>
            <div className='flex flex-row justify-between px-8'>
                <AddProductModal></AddProductModal>
                <div className='text-6xl font-bold'> المنتجات</div>
            </div>
            <div className='pt-20'>
                <ProductsList></ProductsList>
            </div>
        </div>

    )
}

export default page
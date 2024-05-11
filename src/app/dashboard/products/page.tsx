import React from 'react'
import { AddProductModal } from '@/components/product/add-product-modal'

import { ProductTable } from '@/components/product/products-table'
type Props = {}

const page = (props: Props) => {
    return (
        <div className='pt-20'>
            <div className='flex flex-row justify-between px-8'>
                <AddProductModal></AddProductModal>
                <div className='text-6xl font-bold'> المنتجات</div>
            </div>
            <div className='pt-20'>
                {/* <ProductsList></ProductsList> */}
                <ProductTable></ProductTable>
            </div>
        </div>

    )
}

export default page
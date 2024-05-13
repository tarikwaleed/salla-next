import React from 'react'
import { auth, currentUser } from "@clerk/nextjs/server";
import { AddProductModal } from '@/components/product/add-product-modal'

import { ProductTable } from '@/components/product/products-table'
type Props = {}

const page = (props: Props) => {
    const { userId } = auth();
    const { sessionClaims } = auth()
    const isAdmin = sessionClaims?.metadata.role === 'admin';
    return (
        <div className='pt-20'>
            <div className='flex flex-row justify-between px-8'>
                <AddProductModal></AddProductModal>
                <div className='text-6xl font-bold'> المنتجات</div>
            </div>
            <div className='pt-20'>
                {/* <ProductsList></ProductsList> */}
                <ProductTable isAdmin={isAdmin}></ProductTable>
            </div>
        </div>

    )
}

export default page
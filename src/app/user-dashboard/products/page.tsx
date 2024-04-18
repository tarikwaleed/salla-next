import ProductsList from '@/components/products-list'
import React from 'react'
import CreateProductButton from '@/components/create-product-btn'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='pt-20'>
            <div className='flex flex-row justify-center'>
                <div></div>
                <CreateProductButton></CreateProductButton>
            </div>
            <div className='pt-20'>
                <ProductsList></ProductsList>
            </div>
        </div>

    )
}

export default page
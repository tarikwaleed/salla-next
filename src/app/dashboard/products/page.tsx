import ProductsList from '@/components/product/products-list'
import React from 'react'
import { Button } from '@/components/ui/button'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='pt-20'>
            <div className='flex flex-row justify-center'>
                <div></div>
                <Button>اضافة منتج</Button>
            </div>
            <div className='pt-20'>
                <ProductsList></ProductsList>
            </div>
        </div>

    )
}

export default page
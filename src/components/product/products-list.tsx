"use client"
import { useQuery } from 'convex/react';
import ProductCard from './product-card';
import { api } from '../../../convex/_generated/api';

const ProductsList = () => {
    const products = useQuery(api.products.getAll);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map(({ _id, productName, productDescription }) => <ProductCard key={_id} productName={productName}
                productDescription={productDescription}
                 id={_id} />)}
        </div>
    );
};

export default ProductsList;

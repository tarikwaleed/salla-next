import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

type ProductProps = {
    productName: string,
    productDescription: string,
    id: string
}
const ProductCard = ({ productName, productDescription, id }: ProductProps) => {
    return (
        <Link href={`/dashboard/products/${id}`}>
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
                    <CardTitle className="text-2xl font-bold mb-2">{productName}</CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        خروف ابيض 
                    </CardDescription>
                </CardContent>
            </Card>
        </Link>

    )
}

export default ProductCard;
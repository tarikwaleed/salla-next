"use client"
import { PlusIcon } from 'lucide-react';
import { Button } from './ui/button'
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

type Props = {}

const CreateProductButton = (props: Props) => {
    const create = useMutation(api.products.createOne);
    return (
        <Button
            size="icon"
            className='text-4xl font-bold  shadow-lg rounded-3xl'
            onClick={() => {
                create({
                    productName: "خروف",
                    productDescription: "dump"
                });
            }}
        >
            <PlusIcon></PlusIcon>
        </Button>
    );
};

export default CreateProductButton
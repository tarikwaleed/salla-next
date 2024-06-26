"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { uploadFiles } from "@xixixao/uploadstuff";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { ChangeEvent, useState } from "react"
import { Progress } from "../ui/progress"
import { useUser } from "@clerk/clerk-react";
import { ProgressSpinner } from 'primereact/progressspinner';
import { useToast } from "@/components/ui/use-toast"
import { Id } from "../../../convex/_generated/dataModel"

const formSchema = z.object({
    age: z.coerce.number(),
    type: z.string().min(2, { message: "لابد من ادخال النوع" }).max(50),
    weight: z.coerce.number(),
    price: z.coerce.number(),
    quantity: z.coerce.number(),
    images: z.custom<FileList>(val => val instanceof FileList, "required")
        .refine(files => files.length > 0, 'لابد من رفع صور')
    // images: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.')

})


export function AddProductModal() {
    const { toast } = useToast()
    const { user } = useUser();
    const [fileProgress, setFileProgress] = useState<{ [key: string]: number }>({})
    const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
    const [storageIds, setStorageIds] = useState<Id<"_storage">[]>([])
    const createProduct = useMutation(api.products.createOne)
    const [submitButtonDisabled, disableSubmitButton] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            age: 0,
            type: "cow",
            weight: 0,
            price: 0,
            quantity: 0,
            images: undefined
        }
    })
    const fileRef = form.register("images")
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const imagesArray = Array.from(values.images)
        const createdProdectId = await createProduct({
            age: values.age,
            type: values.type,
            weight: values.weight,
            price: values.price,
            quantity: values.quantity,
            userId: user?.id,
            storageIds: storageIds

        })

        form.reset()
        setFileProgress({})
        setIsDialogOpen(false)
        toast({
            variant: "green",
            title: "تم اضافة المنتج بنجاح",
        })

    }
    const handeFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const files = Array.from(event.target.files);
        const url = await generateUploadUrl()
        const uploaded: any[] = await uploadFiles({

            files,
            url,
            onUploadProgress: ({ file, progress }) => {
                setFileProgress((prevProgress) => ({
                    ...prevProgress,
                    [file]: progress,
                }));
            },
            onUploadBegin: ({ file }) => {
                setFileProgress({})
            },
        });
        console.log(uploaded)
        const storageIdsArray = uploaded.map(file => file.response.storageId);
        setStorageIds(storageIdsArray);
        disableSubmitButton(false)

    }


    return (
        <>
            <Dialog
                open={isDialogOpen}
            >

                <DialogTrigger asChild >
                    <Button
                        onClick={() => {
                            setIsDialogOpen(true)
                        }}
                    >
                        اضافة منتج
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className="sm:max-w-[425px] overflow-y-auto max-h-[70vh]"
                    onInteractOutside={() => {
                        setIsDialogOpen(false)
                    }}
                >
                    <DialogHeader className="mb-8">
                        <DialogTitle>اضافة منتج</DialogTitle>
                        <DialogDescription>
                            قم باضافة كافة التفاصيل الخاصه بمنتجك
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>العمر</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>النوع</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>الوزن بعد الذبح(تقريبي)</FormLabel>
                                        <FormControl>
                                            <Input type="number"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>السعر</FormLabel>
                                        <FormControl>
                                            <Input type="number"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>الكميه</FormLabel>
                                        <FormControl>
                                            <Input type="number"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="images"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>صور</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...fileRef}
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handeFileInputChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {Object.keys(fileProgress).map((fileName) => (
                                <div key={fileName}>
                                    <span>{fileName}: </span>
                                    <Progress value={fileProgress[fileName]} />
                                </div>
                            ))}
                            <div className="flex flex-row justify-between">
                                {!form.formState.isSubmitting ?
                                    <Button
                                        disabled={submitButtonDisabled}
                                        type="submit"
                                    >
                                        اضافة
                                    </Button>
                                    :
                                    <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="4" animationDuration=".5s" />
                                }
                                <Button
                                    onClick={() => {
                                        setIsDialogOpen(false)
                                    }}
                                >
                                    اغلاق
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>

    )
}

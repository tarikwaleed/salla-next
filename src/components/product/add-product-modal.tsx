"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UploadFileResponse, useUploadFiles } from "@xixixao/uploadstuff/react";
import { uploadFiles } from "@xixixao/uploadstuff";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { ChangeEvent, useEffect, useState } from "react"
import { Progress } from "../ui/progress"
import { useUser } from "@clerk/clerk-react";
import { ProgressSpinner } from 'primereact/progressspinner';

const formSchema = z.object({
    age: z.coerce.number(),
    type: z.string().min(2, { message: "لابد من ادخال النوع" }).max(50),
    weight: z.coerce.number(),
    images: z.custom<FileList>(val => val instanceof FileList, "required")
        .refine(files => files.length > 0, 'لابد من رفع صور')
    // images: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.')

})

interface ConvexResponseType {
    storageId: string
}

export function AddProductModal() {

    const { isSignedIn, user, isLoaded } = useUser();
    const [fileProgress, setFileProgress] = useState<{ [key: string]: number }>({})
    const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
    const [storageIds, setStorageIds] = useState<string[]>([])
    const createProduct = useMutation(api.products.createOne)
    const [submitButtonDisabled, disableSubmitButton] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            age: 0,
            type: "cow",
            weight: 0,
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
            userId: user?.id,
            storageIds: storageIds

        })
    }
    const handeFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const files = Array.from(event.target.files);
        const url = await generateUploadUrl()
        const uploaded: UploadFileResponse<ConvexResponseType>[] = await uploadFiles({

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
            <Dialog  >
                <DialogTrigger asChild >
                    <Button
                    >
                        اضافة منتج
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[70vh]">
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

                            {!form.formState.isSubmitting ?
                                <Button
                                    disabled={submitButtonDisabled}
                                    type="submit"
                                >
                                    <span>اضافة</span>
                                </Button>
                                :
                                <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="4" animationDuration=".5s" />
                            }
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>

    )
}

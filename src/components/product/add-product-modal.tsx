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
import { DialogOverlay } from "@radix-ui/react-dialog"
const formSchema = z.object({
    age: z.coerce.number(),
    type: z.string().min(2, { message: "لابد من ادخال النوع" }).max(50),
    weight: z.coerce.number(),
    images: z.custom<FileList>(val => val instanceof FileList, "required")
        .refine(files => files.length > 0, 'لابد من رفع صور')
    // images: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.')

})


export function AddProductModal() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            age: 0,
            type: "",
            weight: 0,
            images: undefined
        }
    })
    const fileRef = form.register("images")
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button >اضافة منتج</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] ">
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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" >اضافة</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

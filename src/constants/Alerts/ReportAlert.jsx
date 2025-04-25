import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { reportSchema } from '@/validation/ReportValidation'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { GoReport } from "react-icons/go";
import { Textarea } from '@/components/ui/textarea';


export default function ReportAlert({ post }) {
    console.log(post);


    const form = useForm({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            message: ''
        },
    });


    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                    <GoReport size={24} />
                    <span className="capitalize font-body font-semibold">
                        Report
                    </span>
                </a>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Report!!!</DialogTitle>
                    <DialogDescription>
                        Spotted something wrong? Tell us what happened!
                    </DialogDescription>
                </DialogHeader>
                <div className="h-auto">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea {...field} placeholder={post} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full bg-mainColor">Report Post</Button>
                        </form>

                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage, Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Textarea } from "@/components/ui/components"
import { reportSchema } from '@/validation/ReportValidation'
import { GoReport } from "react-icons/go";
import { useSelector } from 'react-redux'
import { useReportPostMutation } from '@/lib/tanstack/querys_mutations'
import Loader from '../Loading/Loader'
import credentials from '@/lib/credentials'


export default function ReportAlert({ post }) {

    const auth = useSelector((state) => state.auth?.userData)

    const { isPending, isSuccess, isError, mutateAsync } = useReportPostMutation()

    const form = useForm({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            message: ''
        },
    });

    function onSubmit(data) {
        mutateAsync({ ...data, post_id: post.$id, name: auth.name, email: auth.email })
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center p-2 space-x-3 rounded-md">
                    <GoReport size={24} />
                    <span className="capitalize font-body font-semibold">
                        Report
                    </span>
                </div>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto dark:bg-dark_bgColor dark:text-white">
                <DialogHeader>
                    <DialogTitle>Report!!!</DialogTitle>
                    <DialogDescription>
                        Spotted something wrong? Tell us what happened!
                    </DialogDescription>
                    {
                        isError && <p className="text-md text-mainColor">
                            Failed to submit report
                        </p>
                    }
                    {
                        isSuccess && <p className="text-md text-green-600">
                            Report Submitted
                        </p>
                    }
                </DialogHeader>
                <div className="h-auto flex flex-col gap-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Type your report here"
                                                maxLength={200} className='max-h-32' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit"
                                className={`w-full dark:text-white bg-mainColor mt-5 
                                            ${isPending ? 'opacity-50 pointer-events-none' : ''}`}

                                disabled={isPending} >
                                Report Post
                            </Button>
                        </form>

                    </Form>

                    {
                        isPending && <Loader />
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

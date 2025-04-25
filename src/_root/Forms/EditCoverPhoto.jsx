import React, { useState } from 'react'
import { test } from '@/constants/Images/images';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import DropZone from '@/components/ui/DropZone';
import { coverSchema } from '@/validation/CoverValidation';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IoIosCamera } from "react-icons/io";


export default function EditCoverPhoto() {

    const [edit, setEdit] = useState(true)

    const form = useForm({
        resolver: zodResolver(coverSchema),
        defaultValues: {
            file: undefined,
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
                <IoIosCamera size={28} color='black' />

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Edit Cover Photo</DialogTitle>
                    <DialogDescription>
                        Changes your cover photo here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="h-auto">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">


                            {
                                edit &&

                                <div className="rounded-lg my-5 w-full aspect-square mx-auto overflow-hidden">
                                    <img
                                        src={test}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            }

                            <Button type='button' onClick={() => setEdit(!edit)} className='w-full'>
                                {edit ? "Discard" : "Undo Discard"}
                            </Button>

                            {
                                !edit &&

                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <DropZone {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            }

                            <Button type="submit" className="w-full bg-mainColor">Save Changes</Button>
                        </form>

                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

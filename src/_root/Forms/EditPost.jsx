import React, { useState } from 'react'
import { power, test } from '@/constants/Images/images';
import { IoIosCloseCircle } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import DropZone from '@/components/ui/DropZone';
import { postSchema } from '@/validation/PostValidation';

const EditPost = () => {

    const [edit, setEdit] = useState(true)

    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            content: "",
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
        <div className="w-full rounded-lg p-4 mx-auto flex flex-col gap-4 dark:bg-dark_hoverColor dark:text-white">

            <div className="flex gap-3 items-center text-center border-b border-b-black/10 justify-center relative pb-2">
                <h1 className="text-2xl font-bold font-title">
                    Edit Post</h1>
                <ul>
                    <li className="rounded-l-md">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <IoIosCloseCircle size={36} className='bg-altColor dark:bg-dark_altColor rounded-full hover:cursor-pointer absolute right-4' />
                                </a>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='dark:bg-dark_bgColor dark:text-white'>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to discard all changes? This action will revert the current page to its initial state and cannot be undone."
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction className='bg-mainColor'>Discard Changes</AlertDialogAction>
                                    <AlertDialogCancel className='dark:text-black'>Continue</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </li>
                </ul>

            </div>

            <div className='flex items-center gap-3'>
                <div className="w-10 h-10 rounded-full bg-black bg-cover bg-center border border-black"
                    style={{ backgroundImage: `url(${power})` }} />

                <h2 className='font-bold font-title'>Mark Henry</h2>
            </div>


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="What's on your mind, User?"  {...field}
                                        className='min-h-32' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {
                        edit &&

                        <div className='flex flex-col gap-3'>
                            <img src={test} alt="" className='rounded-lg' />

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

                    <Button type="submit" className="w-full bg-mainColor">Edit Post</Button>
                </form>

            </Form>
        </div>
    )
}

export default EditPost
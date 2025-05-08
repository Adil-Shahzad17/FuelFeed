import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage, Button, Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/components"
import DropZone from '@/components/ui/DropZone';
import { coverSchema } from '@/validation/CoverValidation';
import { IoIosCamera } from "react-icons/io";
import { useSelector } from 'react-redux';
import userService from '@/lib/appwrite/services/UserService';
import { useEditCoverMutation } from '@/lib/tanstack/querys_mutations';
import Loader from '@/constants/Loading/Loader';


export default function EditCoverPhoto() {

    const [edit, setEdit] = useState(true)
    const user = useSelector((state) => state.user.userData)
    const { mutateAsync, isError, error, isPending } = useEditCoverMutation()

    const form = useForm({
        resolver: zodResolver(coverSchema),
        defaultValues: {
            file: undefined,
        },
    });


    // 2. Define a submit handler.
    function onSubmit(data) {
        mutateAsync({ ...data, user_id: user.$id })
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <IoIosCamera size={28} color='black' />

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto dark:bg-dark_bgColor dark:text-white">
                <DialogHeader>
                    <DialogTitle>Edit Cover Photo</DialogTitle>
                    <DialogDescription>
                        Changes your cover photo here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="h-auto">
                    {
                        isError && <p className="text-md text-mainColor">
                            {error.message}
                        </p>
                    }

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">

                            {
                                (edit && user.cover_img) ? <img src={userService.getUserFilePreview(user.cover_img)} alt="" className='rounded-lg' />
                                    :
                                    <div className='w-full h-32 border border-altColor/45 flex justify-center items-center rounded-lg'>
                                        <p>No existing cover photo found</p>
                                    </div>
                            }

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

                            <Button type='button' onClick={() => setEdit(!edit)} className='w-full dark:bg-white dark:text-black'>
                                {edit ? "Choose Photo" : "Discard"}
                            </Button>

                            <Button type="submit"
                                className={`w-full dark:text-white bg-mainColor mt-5 
                                                                            ${isPending ? 'opacity-50 pointer-events-none' : ''}`}

                                disabled={isPending} >
                                Save Changes
                            </Button>
                            {
                                isPending && <Loader />
                            }
                        </form>

                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

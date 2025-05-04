import React, { useState } from 'react'
import { power } from '@/constants/Images/images';
import { IoIosCloseCircle } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Button, Form, FormControl, FormField, FormItem, FormMessage, AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger, Textarea
} from "@/components/ui/components"
import DropZone from '@/components/ui/DropZone';
import { profileSchema } from '@/validation/ProfileValidation';
import { useParams } from 'react-router-dom';
import { useEditProfileMutation, useUserQuery } from '@/lib/tanstack/querys_mutations';
import userService from '@/lib/appwrite/services/UserService';
import LoaderPage from '@/constants/Loading/LoaderPage';
import Loader from '@/constants/Loading/Loader';

const EditProfile = () => {

    const [edit, setEdit] = useState(true)
    const { user_id } = useParams()
    console.log(user_id);

    const { data, isFetching, isError, error, isSuccess } = useUserQuery(user_id)
    const { isPending, mutateAsync } = useEditProfileMutation()
    if (isSuccess) {
        console.log(data)
    }


    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            bio: "",
            file: undefined,
        },
    });


    // 2. Define a submit handler.
    function onSubmit(values) {
        mutateAsync({ ...values, user_id: data.$id })
        // console.log(values);
    }

    if (isFetching) {
        return (
            <>
                <LoaderPage />
            </>
        )
    }

    return (
        <div className="w-full rounded-lg p-4 mx-auto flex flex-col gap-4 
        dark:bg-dark_altColor dark:text-white">

            <div className="flex gap-3 items-center text-center border-b border-b-black/10 justify-center relative pb-2">
                <h1 className="text-2xl font-bold font-title">
                    Edit Profile
                </h1>

                {
                    isError && <p className="text-md text-mainColor">
                        {error.message}
                    </p>
                }

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

                <h2 className='font-bold font-title'>{data.user_name}</h2>
            </div>


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Add your bio here, User?"  {...field}
                                        className='min-h-32' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex flex-col gap-3 '>
                        <h3 className='text-2xl font-title font-bold '>Profile Image</h3>
                        {
                            (edit && data.profile_img) ? <img src={userService.getUserFilePreview(data.profile_img)} alt="" className='rounded-lg' />
                                :
                                <div className='w-full h-32 border border-altColor/45 flex justify-center items-center rounded-lg'>
                                    <p>No existing profile photo found</p>
                                </div>
                        }

                    </div>

                    {
                        !edit && <FormField
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

                    <Button type='button' onClick={() => setEdit(!edit)} className='w-full'>
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
    )
}

export default EditProfile
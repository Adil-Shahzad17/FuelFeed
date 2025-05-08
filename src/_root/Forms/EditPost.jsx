import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button, Form, FormControl, FormField, FormItem, FormMessage, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Textarea, Separator } from "@/components/ui/components"
import DropZone from '@/components/ui/DropZone';
import { postSchema } from '@/validation/PostValidation';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userService from '@/lib/appwrite/services/UserService';
import { profilePhoto } from '@/constants/Images/images';
import { useEditPostMutation, useGetPostQuery } from '@/lib/tanstack/querys_mutations';
import SkeletonLoader from '@/constants/Loading/SkeletonLoader';
import post_service from '@/lib/appwrite/services/PostService';
import Loader from '@/constants/Loading/Loader';

const EditPost = () => {

    const [edit, setEdit] = useState(true)
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.userData)
    const { post_id } = useParams()

    const { data, isPending, isError, error, isSuccess } = useGetPostQuery(post_id)
    if (isSuccess) {
        console.log(data);
    }

    useEffect(() => {
        if (data) {
            form.reset({ content: data.content }); // ✅ Syncs default value after load
        }
    }, [data])

    const { mutateAsync } = useEditPostMutation()

    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            content: "",
            category: undefined,
            file: undefined,
        },
    });


    // 2. Define a submit handler.
    function onSubmit(values) {
        // console.log(values);
        mutateAsync({ ...values, edit, post_id, prev_image: data.post_img, user_id: user.$id })
    }

    return (
        <div className="w-full rounded-lg p-4 mx-auto flex flex-col gap-4 dark:bg-dark_hoverColor dark:text-white">

            <div className="flex gap-3 items-center text-center border-b border-b-black/10 justify-center relative pb-2">
                <h1 className="text-2xl font-bold font-title">
                    Edit Post
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
                                <Link className="flex items-center p-2 space-x-3 rounded-md">
                                    <IoIosCloseCircle size={36} className='bg-altColor dark:bg-dark_altColor rounded-full hover:cursor-pointer absolute right-4' />
                                </Link>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='dark:bg-dark_bgColor dark:text-white'>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to discard all changes? This action will revert the current page to its initial state and cannot be undone."
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction className='bg-mainColor dark:text-white'
                                        onClick={() => navigate("/profile")}>Discard Changes</AlertDialogAction>
                                    <AlertDialogCancel className='text-black dark:text-white'>Continue</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </li>
                </ul>

            </div>

            <div className='flex items-center gap-3'>
                <div className="w-10 h-10 rounded-full bg-black bg-cover bg-center border border-black"
                    style={{
                        backgroundImage: `url(${user.profile_img ? userService.getUserFilePreview(user.profile_img) : profilePhoto})`
                    }}
                />

                <h2 className='font-bold font-title'>{user.user_name}</h2>
            </div>

            {
                isPending && <SkeletonLoader />
            }

            {
                isSuccess &&


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

                        <Separator />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a topic" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Category</SelectLabel>
                                                    <SelectItem value="self_improvement">Self Improvement</SelectItem>
                                                    <SelectItem value="Discipline">Discipline</SelectItem>
                                                    <SelectItem value="Consistency">Consistency</SelectItem>
                                                    <SelectItem value="Productivity">Productivity</SelectItem>
                                                    <SelectItem value="Motivation">Motivation</SelectItem>
                                                    <SelectItem value="Focus">Focus</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Separator />


                        {
                            edit &&

                            <div className='flex flex-col gap-3'>
                                <img src={data.post_img && post_service.getFilePreview(data.post_img)} alt="" className='rounded-lg' />

                            </div>
                        }

                        <Separator />


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

                        <Button type='button' onClick={() => setEdit(!edit)} className='w-full'>
                            {edit ? "Choose Photo" : "Discard"}
                        </Button>

                        <Button type="submit"
                            className={`w-full dark:text-white bg-mainColor mt-5 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
                            disabled={isPending} >
                            Edit Post
                        </Button>

                        {
                            isPending && <Loader />
                        }
                    </form>

                </Form>
            }
        </div>
    )
}

export default EditPost
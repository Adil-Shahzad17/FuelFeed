import React from 'react'
import { power } from '@/constants/Images/images';
import { IoIosCloseCircle } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { postSchema } from '@/validation/PostValidation';
import Dropzone from '@/components/ui/DropZone';
import { useCreatePostMutation } from '@/lib/tanstack/querys_mutations';
import { useSelector } from 'react-redux';
import Loader from '@/constants/Loading/Loader';

const CreatePost = () => {

    const user = useSelector((state) => state.user.userData)
    const { mutateAsync, isError, error, isPending } = useCreatePostMutation()

    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            content: "",
            category: undefined,
            file: undefined
        },
    });


    // 2. Define a submit handler.
    function onSubmit(data) {
        mutateAsync({ ...data, user_id: user.$id })
    }

    return (
        <div className="w-full rounded-md p-4 mx-auto flex flex-col gap-4 dark:text-white dark:bg-dark_altColor">

            <div className="flex gap-3 items-center text-center border-b border-b-black/10 justify-center relative pb-2            ">
                <h1 className="text-2xl font-bold font-title">
                    Create Post
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
                                    <AlertDialogCancel className='text-black'>Continue</AlertDialogCancel>
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
                                        className='min-h-32' maxLength={2000} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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

                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Dropzone {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit"
                        className={`w-full dark:text-white bg-mainColor mt-5 
                                            ${isPending ? 'opacity-50 pointer-events-none' : ''}`}

                        disabled={isPending} >
                        Create Post
                    </Button>
                    {
                        isPending && <Loader />
                    }
                </form>

            </Form>
        </div>
    )
}

export default CreatePost
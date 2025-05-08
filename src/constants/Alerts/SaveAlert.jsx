import { Button, AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/components"
import { useSavePostMutation } from "@/lib/tanstack/querys_mutations";
import { FaImages } from "react-icons/fa";
import Loader from "../Loading/Loader";


export default function SaveAlert({ post }) {
    console.log(post);
    const { mutateAsync, isError, error, isPending } = useSavePostMutation()

    const handleSave = async () => {
        await mutateAsync({ ...post })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex items-center p-2 space-x-3 rounded-md">
                    <FaImages size={24} />
                    <span className="capitalize font-body font-semibold">
                        Save
                    </span>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className='dark:bg-dark_bgColor dark:text-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Save Post</AlertDialogTitle>
                    <AlertDialogDescription>
                        This post will be saved in your save collection.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='dark:text-white text-black'>Cancel</AlertDialogCancel>
                    <Button className='bg-green-600 text-white' onClick={handleSave}>
                        Save
                    </Button>
                </AlertDialogFooter>

                {
                    isError && <p className="text-md text-mainColor">
                        {error.message}
                    </p>
                }
                {
                    isPending &&
                    <Loader />
                }
            </AlertDialogContent>
        </AlertDialog>
    )
}

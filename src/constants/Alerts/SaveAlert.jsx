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
                        Are you sure you want to save this post in saves collection?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='dark:text-black'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-green-600'
                        onClick={handleSave}>Continue</AlertDialogAction>
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

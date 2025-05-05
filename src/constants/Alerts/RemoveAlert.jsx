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
import { useDeleteSavePostMutation } from "@/lib/tanstack/querys_mutations";
import { IoIosCloseCircle } from "react-icons/io";
import Loader from "../Loading/Loader";



export default function RemoveAlert({ post }) {
    console.log(post);


    const { mutateAsync, isError, isPending, error } = useDeleteSavePostMutation()

    const handleDelete = async () => {
        mutateAsync(post)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex items-center p-2 space-x-3 rounded-md">
                    <IoIosCloseCircle size={24} />
                    <span className="capitalize font-body font-semibold">
                        Remove
                    </span>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className='dark:bg-dark_bgColor dark:text-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove this
                        post from saved collection.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='dark:text-white'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-mainColor dark:text-white'
                        onClick={handleDelete}>Delete</AlertDialogAction>
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

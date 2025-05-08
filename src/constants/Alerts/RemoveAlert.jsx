import { Button, AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/components"
import { useDeleteSavePostMutation } from "@/lib/tanstack/querys_mutations";
import { IoIosCloseCircle } from "react-icons/io";
import Loader from "../Loading/Loader";



export default function RemoveAlert({ post }) {
    console.log(post);


    const { mutateAsync, isError, isPending, error } = useDeleteSavePostMutation()

    const handleRemove = async () => {
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
                    <AlertDialogTitle>UnSave Post</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to remove this post from save collections?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='dark:text-white text-black'>Cancel</AlertDialogCancel>
                    <Button className='bg-mainColor text-white' onClick={handleRemove}>
                        Remove
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

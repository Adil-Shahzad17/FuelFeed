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
import { Button } from "@/components/ui/components";
import { useDeletePostMutation } from "@/lib/tanstack/querys_mutations";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../Loading/Loader";


export default function DeleteAlert({ post }) {

    const { mutateAsync, isPending, isError, error, } = useDeletePostMutation()

    const handleDelete = async () => {
        await mutateAsync({ ...post })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Link to='' className="flex items-center p-2 space-x-3 rounded-md">
                    <MdDelete size={24} />
                    <span className="capitalize font-body font-semibold">
                        Delete
                    </span>
                </Link>
            </AlertDialogTrigger>
            <AlertDialogContent className='dark:bg-dark_bgColor dark:text-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        post.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='dark:text-white text-black'>Cancel</AlertDialogCancel>
                    <Button className='bg-mainColor text-white' onClick={handleDelete}>
                        Delete
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

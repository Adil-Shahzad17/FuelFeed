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
import { useDeletePostMutation } from "@/lib/tanstack/querys_mutations";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../Loading/Loader";


export default function DeleteAlert({ post }) {

    const { mutateAsync, isPending, isError, error, } = useDeletePostMutation()

    const handleSubmit = async () => {
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
                    <AlertDialogCancel className='dark:text-black'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-mainColor'
                        onClick={handleSubmit}>Delete</AlertDialogAction>
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

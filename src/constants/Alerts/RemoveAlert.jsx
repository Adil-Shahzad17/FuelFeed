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
import { IoIosCloseCircle } from "react-icons/io";



export default function RemoveAlert({ post }) {
    console.log(post);
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                    <IoIosCloseCircle size={24} />
                    <span className="capitalize font-body font-semibold">
                        Remove
                    </span>
                </a>
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
                    <AlertDialogCancel className='dark:text-black'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-mainColor'>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

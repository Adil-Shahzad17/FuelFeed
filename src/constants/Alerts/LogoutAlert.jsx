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
import { GiExitDoor } from "react-icons/gi"


export default function LogoutAlert({ post }) {
    console.log(post);
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-l-md hover:bg-hoverColor dark:hover:bg-dark_hoverColor text-[#343a40] dark:text-mainColor">
                    <GiExitDoor size={24} />
                    <span className="capitalize font-body font-semibold dark:text-white">
                        Logout
                    </span>
                </a>
            </AlertDialogTrigger>
            <AlertDialogContent className='dark:bg-dark_bgColor dark:text-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hold on!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you wanna log out?
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

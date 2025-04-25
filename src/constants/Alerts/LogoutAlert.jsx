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
                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-l-md hover:bg-hoverColor">
                    <GiExitDoor size={24} color='#343a40' />
                    <span className="capitalize font-body font-semibold">
                        Logout
                    </span>
                </a>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hold on!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you wanna log out?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button
} from "@/components/ui/components"
import { GiExitDoor } from "react-icons/gi"
import { useLogoutMutation } from "@/lib/tanstack/querys_mutations";
import Loader from "../Loading/Loader";

export default function LogoutAlert() {

    const { isPending, isError, error, mutateAsync } = useLogoutMutation()

    const handleLogout = async () => {
        await mutateAsync()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex items-center p-2 space-x-3 rounded-l-md hover:bg-hoverColor dark:hover:bg-dark_hoverColor text-[#343a40] dark:text-mainColor">
                    <GiExitDoor size={24} />
                    <span className="capitalize font-body font-semibold dark:text-white">
                        Logout
                    </span>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className='dark:bg-dark_bgColor dark:text-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hold on!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you wanna log out?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='dark:text-white text-black'>Cancel</AlertDialogCancel>
                    <Button className='bg-mainColor text-white' onClick={handleLogout}>
                        Log out
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

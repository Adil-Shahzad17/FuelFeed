import React from 'react'
import { FaThumbsUp, FaRegThumbsUp, FaShare } from "react-icons/fa6";
import { Ellipsis } from 'lucide-react';
import { test } from '@/constants/Images/images';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { PostIcons } from '@/constants/Icons/PostIcons';

const Posts = ({ show }) => {

    const [liked, setLiked] = React.useState(false)
    const [count, setCount] = React.useState(0)

    return (
        <>
            <div className="dark:bg-gray-900 flex items-center justify-center">
                <div className="px-5 py-4 w-full h-auto dark:bg-gray-800 shadow rounded-lg ">
                    <div className="flex justify-between">
                        <div className='flex mb-4'>

                            <img className="w-12 h-12 rounded-full object-cover" src={test} />
                            <div className="ml-2 mt-0.5">
                                <span className="block font-medium font-title text-base leading-snug text-black dark:text-gray-100">Loyce Kuvalis</span>
                                <span className="block text-sm font-heading text-gray-500 dark:text-gray-400 font-light leading-snug">16 December at 08:25</span>
                            </div>

                        </div>
                        <div >
                            <DropdownMenu>
                                <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                                <DropdownMenuContent className='absolute right-0'>

                                    {
                                        PostIcons.map((icon) => (
                                            <ul key={icon.iconName} className="space-y-2">
                                                <li className="rounded-l-md hover:bg-hoverColor">

                                                    {
                                                        (show === 'saves' && icon.iconName === "Remove") &&
                                                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                            {icon.icon}
                                                            <span className="capitalize font-body font-semibold">
                                                                {icon.iconName}
                                                            </span>
                                                        </a>
                                                    }

                                                    {
                                                        (show === 'home' && icon.iconName === "Report") &&
                                                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                            {icon.icon}
                                                            <span className="capitalize font-body font-semibold">
                                                                {icon.iconName}
                                                            </span>
                                                        </a>
                                                    }

                                                    {
                                                        (show === 'profile' && !(icon.iconName === "Report" || icon.iconName === "Remove")) &&
                                                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                            {icon.icon}
                                                            <span className="capitalize font-body font-semibold">
                                                                {icon.iconName}
                                                            </span>
                                                        </a>
                                                    }
                                                </li>
                                            </ul>
                                        ))
                                    }


                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <p className="text-gray-800 font-body dark:text-gray-100 leading-snug md:leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <img src={test} alt="" className='rounded-lg my-5 w-full h-32 mx-auto' />

                    <div className="w-full mt-5 bg-white rounded-md shadow-sm p-2">
                        <div className="flex items-center justify-between px-2">
                            {
                                count > 0 &&
                                <div className="flex items-center space-x-2 font-body">
                                    <FaThumbsUp size={16} color='blue' />
                                    <span className="text-sm text-gray-700">{count}</span>
                                </div>
                            }
                        </div>

                        <hr className="my-2" />

                        <div className="flex justify-around text-[#8d8d8d] text-sm font-medium">
                            <div className="flex items-center space-x-4 font-body text-base font-medium hover:bg-gray-100 p-2 rounded cursor-pointer"
                                onClick={(() => {
                                    setLiked(!liked)
                                    if (!liked) setCount(count + 1)
                                    if (liked) setCount(count - 1)
                                })}
                            >
                                {
                                    liked ?
                                        <FaThumbsUp size={24} /> : <FaRegThumbsUp size={24} />
                                }
                                <span>Like</span>
                            </div>
                            <div className="px-8 flex items-center space-x-4 font-body text-base font-medium hover:bg-gray-100 p-2 rounded cursor-pointer">
                                <FaShare size={24} />
                                <span>Share</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>

    )
}

export default Posts
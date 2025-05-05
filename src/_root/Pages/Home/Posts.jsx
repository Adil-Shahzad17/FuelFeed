import React from 'react'
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa6";
import { Ellipsis } from 'lucide-react';
import { test } from '@/constants/Images/images';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdEdit } from "react-icons/md";
import DeleteAlert from '@/constants/Alerts/DeleteAlert';
import ReportAlert from '@/constants/Alerts/ReportAlert';
import RemoveAlert from '@/constants/Alerts/RemoveAlert';
import SaveAlert from '@/constants/Alerts/SaveAlert';
import ShareAlert from '@/constants/Alerts/ShareAlert';
import post_service from '@/lib/appwrite/services/PostService';
import userService from '@/lib/appwrite/services/UserService';
import { useNavigate } from 'react-router-dom';

const Posts = ({ show, posts, user }) => {

    const [liked, setLiked] = React.useState(false)
    const [count, setCount] = React.useState(0)

    const navigate = useNavigate()

    console.log(user);
    console.log(posts);



    return (
        <>
            <div className="dark:bg-gray-900 flex items-center justify-center">
                <div className="px-5 py-4 w-full h-auto dark:bg-dark_altColor shadow rounded-lg bg-white">
                    <div className="flex justify-between">
                        <div className='flex mb-4'>

                            <img className="w-12 h-12 rounded-full object-cover" src={userService.getUserFilePreview(user.profile_img)} />
                            <div className="ml-2 mt-0.5">
                                <span className="block font-medium font-title text-base leading-snug text-black dark:text-gray-100">{user.user_name}</span>
                                <span className="block text-sm font-heading text-gray-500 dark:text-gray-400 font-light leading-snug">
                                    {new Date(posts.$createdAt).toLocaleString("en-UK", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}

                                </span>
                            </div>

                        </div>
                        <div >
                            <DropdownMenu>
                                <DropdownMenuTrigger><Ellipsis className='dark:text-white' /></DropdownMenuTrigger>
                                <DropdownMenuContent className='absolute right-0'>
                                    {
                                        show === 'profile' &&

                                        <ul className="space-y-2">
                                            <li className="rounded-l-md hover:bg-hoverColor">
                                                <div className="flex items-center p-2 space-x-3 rounded-md"
                                                    onClick={() => navigate(`/editpost/${posts.$id}`)} >
                                                    <MdEdit size={24} />
                                                    <span className="capitalize font-body font-semibold">
                                                        Edit
                                                    </span>
                                                </div>

                                            </li>
                                        </ul>
                                    }

                                    <ul className="space-y-2">
                                        <li className="hover:bg-hoverColor
                                        flex flex-col rounded-md">
                                            {
                                                show === 'profile' &&
                                                <>
                                                    <DeleteAlert post={posts} />
                                                </>
                                            }
                                            {show === 'home' &&
                                                <>
                                                    <SaveAlert post={posts} />
                                                    <ReportAlert post={posts.$id} />
                                                </>
                                            }
                                            {show === 'saved' &&
                                                <RemoveAlert post={posts.$id} />
                                            }
                                        </li>
                                    </ul>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="text-gray-800 font-body dark:text-gray-100 leading-snug md:leading-normal flex flex-col                     gap-3">

                        <p >{posts.content}</p>

                        <h2 className='italic font-heading text-blue-500'>#{posts.category}</h2>
                    </div>

                    {
                        posts.post_img &&
                        <div className="rounded-lg my-5 w-full aspect-square mx-auto overflow-hidden">
                            <img
                                src={post_service.getFilePreview(posts.post_img)}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    }

                    <div className="w-full mt-5 bg-white dark:bg-dark_bgColor rounded-md shadow-sm p-2">
                        <div className="flex items-center justify-between px-2">
                            {
                                count > 0 &&
                                <div className="flex items-center space-x-2 font-body">
                                    <FaThumbsUp size={16} color='blue' />
                                    <span className="text-sm text-gray-700 dark:text-white">{count}</span>
                                </div>
                            }
                        </div>

                        <hr className="my-2" />



                        <div className="flex justify-around text-[#8d8d8d] text-sm font-medium">

                            {
                                show === 'home' &&
                                <div className="flex items-center space-x-4 font-body text-base font-medium hover:bg-gray-100 dark:hover:bg-dark_hoverColor p-2 rounded cursor-pointer"
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
                            }

                            <ShareAlert />
                        </div>


                    </div>

                </div>
            </div>

        </>

    )
}

export default Posts
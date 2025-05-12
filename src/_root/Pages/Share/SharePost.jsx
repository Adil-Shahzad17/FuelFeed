import React from 'react'
import { useParams } from 'react-router-dom'
import post_service from '@/lib/appwrite/services/PostService'
import userService from '@/lib/appwrite/services/UserService'
import { useGetPostQuery } from '@/lib/tanstack/querys_mutations'
import SkeletonLoader from '@/constants/Loading/SkeletonLoader'

const SharePost = () => {
    const { post_id } = useParams()
    const { data, isSuccess, isError, isFetching } = useGetPostQuery(post_id)

    if (isFetching) {
        return <SkeletonLoader />
    }

    if (isError) {
        return (
            <h1 className='text-2xl dark:text-white text-center'>Failed to Load Posts</h1>
        )
    }

    if (isSuccess) {
        return (
            <div className="dark:bg-gray-900 flex items-center justify-center mb-2">
                <div className="px-5 py-4 w-full h-auto dark:bg-dark_altColor shadow rounded-lg bg-white">
                    <div className="flex justify-between">
                        <div className='flex mb-4'>

                            <img className="w-12 h-12 rounded-full object-cover" src={userService.getUserFilePreview(data.profile_img)} />
                            <div className="ml-2 mt-0.5">
                                <span className="block font-medium font-title text-base leading-snug text-black dark:text-gray-100">{data.user_name}</span>
                                <span className="block text-sm font-heading text-gray-500 dark:text-gray-400 font-light leading-snug">
                                    {new Date(data.$createdAt).toLocaleString("en-UK", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}

                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="text-gray-800 font-body dark:text-gray-100 leading-snug md:leading-normal flex flex-col                     gap-3">

                        <p >{data.content}</p>

                        <h2 className='italic font-heading text-blue-500'>#{data.category}</h2>
                    </div>

                    {
                        data.post_img &&
                        <div className="rounded-lg my-5 w-full mx-auto overflow-hidden">
                            <img
                                src={post_service.getFilePreview(data.post_img)}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    }

                    <div className="w-full mt-5 bg-white dark:bg-dark_bgColor rounded-md shadow-sm p-2">
                        <div className="flex items-center justify-between px-2">
                            {
                                (data.likes_count) &&
                                <div className="flex items-center space-x-2 font-body">
                                    <FaThumbsUp size={16} color='blue' />
                                    <span className="text-sm text-gray-700 dark:text-white">
                                        {Number(data.likes_count)}
                                    </span>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default SharePost
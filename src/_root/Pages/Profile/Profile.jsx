import React, { useEffect, useState } from 'react'
import { coverPhoto, profilePhoto } from '@/constants/Images/images'
import Posts from '../Home/Posts';
import { MdEdit } from 'react-icons/md';
import { Button } from "@/components/ui/components"
import EditCoverPhoto from '@/_root/Forms/EditCoverPhoto';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import userService from '@/lib/appwrite/services/UserService';
import { useUserPostsQuery, useUserQuery } from '@/lib/tanstack/querys_mutations';
import Loader from '@/constants/Loading/Loader';
import SkeletonLoader from '@/constants/Loading/SkeletonLoader';
import { useInView } from 'react-intersection-observer';

const Profile = () => {

    const user = useSelector((state) => state.user.userData)
    const { user_id } = useParams()
    const { ref, inView } = useInView({ delay: 200 });

    const { data: userProfile, error: userError, isError: userIsError, isFetching, isSuccess: userSuccess } = useUserQuery(user_id)

    const { data,
        error,
        isLoading,
        isSuccess,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useUserPostsQuery(user_id)

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="w-full mx-auto flex flex-col gap-2 dark:text-white">

            {
                isFetching && <Loader />
            }
            {
                userSuccess && <>

                    <div className='w-full relative pb-6 '>
                        <div className="h-52 rounded-lg relative bg-cover bg-center"
                            style={{ backgroundImage: `url(${coverPhoto})` }}
                        >
                            <img src={userProfile.cover_img ? userService.getUserFilePreview(userProfile.cover_img) : coverPhoto} alt="Cover Photo" className='h-52 w-full object-cover rounded-lg' />
                            {
                                (user.$id == user_id) &&
                                <div className='bg-white absolute gap-2 py-2 px-3 rounded-md right-2 bottom-2 hover:cursor-pointer '>
                                    <EditCoverPhoto />
                                </div>
                            }

                        </div>

                        <div className='bg-altColor w-24 h-24 rounded-full border-4 border-white absolute left-3 
                bottom-0'>

                            <img src={userProfile.profile_img ? userService.getUserFilePreview(userProfile.profile_img
                            ) : profilePhoto} alt="Profile Photo" className='w-full h-full object-cover rounded-full' />


                        </div>

                    </div>
                    <div className='flex items-center justify-between px-3'>

                        <h1 className='text-xl font-title font-bold capitalize'>{userProfile.user_name}</h1>
                        {
                            (user.$id == user_id) &&
                            <Link to={`/editprofile/${user.$id}`}>
                                <Button className='bg-mainColor text-white'>Edit Profile <MdEdit /> </Button>
                            </Link>
                        }
                    </div>

                    <div className='text-base font-body mt-4 mb-2 px-4'>
                        {userProfile.bio}
                    </div>
                </>
            }
            <hr />

            <h2 className='font-title font-bold text-2xl my-4'>All Posts</h2>

            {
                isError && <p className="text-md text-mainColor">
                    {error.message}
                </p>
            }
            {
                userIsError && <p className="text-md text-mainColor">
                    {userError.message}
                </p>
            }

            {
                isLoading && <SkeletonLoader />
            }

            {
                (isSuccess && data.pages[0]) &&
                data.pages.map((page) => (
                    page.documents.map((post) => (
                        <Posts show='home' posts={post} key={post.$id} />
                    ))
                ))
            }

            <div ref={ref} className='text-mainColor text-center py-2'>
                {isFetchingNextPage && <Loader />}
                {!hasNextPage && (
                    <div className='font-heading my-2'>
                        No more posts to load
                    </div>
                )}
            </div>

        </div>
    )
}

export default Profile
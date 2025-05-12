import React, { useEffect } from 'react'
import { coverPhoto, profilePhoto } from '@/constants/Images/images'
import Posts from '../Home/Posts';
import { MdEdit } from 'react-icons/md';
import { Button } from "@/components/ui/components"
import EditCoverPhoto from '@/_root/Forms/EditCoverPhoto';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import userService from '@/lib/appwrite/services/UserService';
import { useUserPostsQuery } from '@/lib/tanstack/querys_mutations';
import Loader from '@/constants/Loading/Loader';
import SkeletonLoader from '@/constants/Loading/SkeletonLoader';
import { useInView } from 'react-intersection-observer';

const Profile = () => {

    const { ref, inView } = useInView({ delay: 200 });
    const user = useSelector((state) => state.user.userData)

    const { user_id } = useParams()
    console.log(user_id);


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

    if (isSuccess) {
        console.log(data);
    }



    return (
        <div className="w-full mx-auto flex flex-col gap-2 dark:text-white">

            <div className='w-full relative pb-6 '>
                <div className="h-52 rounded-lg relative bg-cover bg-center"
                    style={{ backgroundImage: `url(${coverPhoto})` }}
                >
                    <img src={user.cover_img ? userService.getUserFilePreview(user.cover_img) : coverPhoto} alt="Cover Photo" className='h-52 w-full object-cover rounded-lg' />


                    <div className='bg-white absolute gap-2 py-2 px-3 rounded-md right-2 bottom-2 hover:cursor-pointer '>
                        <EditCoverPhoto />
                    </div>

                </div>

                <div className='bg-altColor w-24 h-24 rounded-full border-4 border-white absolute left-3 
                bottom-0'>
                    <img src={user.profile_img ? userService.getUserFilePreview(user.profile_img
                    ) : profilePhoto} alt="Profile Photo" className='w-full h-full object-cover rounded-full' />

                </div>

            </div>
            <div className='flex items-center justify-between px-3'>

                <h1 className='text-xl font-title font-bold capitalize'>{user.user_name}</h1>
                <Link to={`/editprofile/${user.$id}`}>
                    <Button className='bg-mainColor text-white'>Edit Profile <MdEdit /> </Button>
                </Link>

            </div>

            <div className='text-base font-body mt-4 mb-2 px-4'>
                {user.bio}
            </div>

            <hr />

            <h2 className='font-title font-bold text-2xl my-4'>All Posts</h2>

            {
                isError && <p className="text-md text-mainColor">
                    {error.message}
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
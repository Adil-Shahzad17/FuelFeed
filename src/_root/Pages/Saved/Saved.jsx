import React, { useEffect } from 'react'
import Posts from '../Home/Posts'
import { useSelector } from 'react-redux'
import { useGetSavePostsQuery } from '@/lib/tanstack/querys_mutations'
import SkeletonLoader from '@/constants/Loading/SkeletonLoader'
import Loader from '@/constants/Loading/Loader'
import { useInView } from 'react-intersection-observer'

const Saved = () => {

    const user = useSelector((state) => state.user.userData)
    const { ref, inView } = useInView({ delay: 200 });

    const { data,
        error,
        isLoading,
        isSuccess,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage, } = useGetSavePostsQuery(user.$id)

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);


    return (
        <div className="w-full p-4 mx-auto flex flex-col gap-4 dark:text-white">

            <div className="flex gap-3 items-center text-center border-b border-b-black/10 justify-center relative pb-2            ">
                <h1 className="text-2xl font-bold font-title">
                    All Saves</h1>

                {
                    isError && <p className="text-md text-mainColor">
                        {error.message}
                    </p>
                }
            </div>

            {
                isError && <p className="text-md text-mainColor">
                    {error.message}
                </p>
            }

            {
                isLoading && <SkeletonLoader />
            }

            {
                isSuccess &&
                data.pages.map((page) => (
                    page.documents.map((post) => (
                        <Posts show='saved' posts={post} key={post.$id} />
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

export default Saved
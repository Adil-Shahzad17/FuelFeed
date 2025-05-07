import React, { useEffect } from 'react'
import WhatsOnYourMind from './WhatsOnYourMind'
import Posts from './Posts'
import { useAllPostsQuery } from '@/lib/tanstack/querys_mutations'
import Loader from '@/constants/Loading/Loader'
import { useInView } from 'react-intersection-observer'
import SkeletonLoader from '@/constants/Loading/SkeletonLoader'

const Home = () => {

    const { ref, inView } = useInView();
    const {
        data,
        error,
        isLoading,
        isSuccess,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useAllPostsQuery();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="h-screen w-full mx-auto px-2 flex flex-col gap-3 overflow-y-auto">
            <WhatsOnYourMind />

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
                        <Posts show='home' posts={post} key={post.$id} />
                    ))
                ))
            }

            <div ref={ref}>
                {isFetchingNextPage && <Loader />}
                {!hasNextPage && <div className='text-mainColor font-heading mx-auto my-2'>No more posts to load</div>}
            </div>

        </div>
    )
}

export default Home
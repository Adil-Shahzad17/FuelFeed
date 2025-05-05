import React from 'react'
import WhatsOnYourMind from './WhatsOnYourMind'
import Posts from './Posts'
import { useAllPostsQuery } from '@/lib/tanstack/querys_mutations'
import SkeletonLoader from '@/constants/Loading/SkeletonLoader'

const Home = () => {

    const { data, isError, error, isPending, isSuccess } = useAllPostsQuery()

    if (isSuccess) {
        console.log(data);
    }

    return (
        <div className="h-screen w-full mx-auto px-2 flex flex-col gap-3 overflow-y-auto">
            <WhatsOnYourMind />

            {
                isError && <p className="text-md text-mainColor">
                    {error.message}
                </p>
            }

            {
                isPending && <SkeletonLoader />
            }

            {
                isSuccess &&
                <div className='flex flex-col gap-5'>
                    {
                        data.documents.map((post) => (
                            <Posts show='home' posts={post} key={post.$id}
                            />
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Home
import React from 'react'
import Posts from '../Home/Posts'
import { useSelector } from 'react-redux'
import { useGetSavePostsQuery } from '@/lib/tanstack/querys_mutations'
import SkeletonLoader from '@/constants/Loading/SkeletonLoader'

const Saved = () => {

    const user = useSelector((state) => state.user.userData)
    console.log(user);

    const { data, isError, error, isFetching, isSuccess } = useGetSavePostsQuery(user.$id)
    if (isSuccess) {
        console.log(data);
    }

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
                isFetching && <SkeletonLoader />
            }

            {
                isSuccess &&
                <div className='flex flex-col gap-5'>
                    {
                        !data.total ?
                            <h3 className='font-title font-bold text-2xl my-4'>You have no posts yet.</h3>
                            :
                            data.documents.map((post) => (
                                <Posts show='saved' posts={post} user={user} key={post.$id}
                                />
                            ))
                    }
                </div>
            }
        </div>
    )
}

export default Saved
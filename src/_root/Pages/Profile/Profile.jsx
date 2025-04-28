import React from 'react'
import { test } from '@/constants/Images/images'
import Posts from '../Home/Posts';
import { MdEdit } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { IoIosCamera } from "react-icons/io";
import EditCoverPhoto from '@/_root/Forms/EditCoverPhoto';

const Profile = () => {
    return (
        <div className="w-full mx-auto flex flex-col gap-2 dark:text-white">

            <div className='w-full rounded-lg relative pb-6'>
                <div className='relative'>
                    <img src={test} alt="" className='max-h-52 w-full object-cover rounded-lg' />

                    <div className='bg-white absolute gap-2 py-2 px-3 rounded-md right-2 bottom-2 hover:cursor-pointer '>
                        <EditCoverPhoto />
                    </div>

                </div>

                <div className='w-24 h-24 rounded-full border-4 border-white absolute left-3 
                bottom-0'>
                    <img src={test} alt="" className='w-full h-full object-cover rounded-full' />
                </div>

            </div>
            <div className='flex items-center justify-between px-3'>

                <h1 className='text-xl font-title font-bold'>Adil Shahzad</h1>
                <Button className='bg-mainColor'>Edit Profile <MdEdit /> </Button>

            </div>

            <div className='text-base font-body mt-4 mb-2 px-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus itaque perferendis cupiditate dolore impedit minima blanditiis tenetur architecto iusto recusandae?
            </div>

            <hr />

            <h2 className='font-title font-bold text-2xl my-4'>All Posts</h2>

            <div className='flex flex-col gap-5'>
                <Posts show='profile' />
            </div>

        </div>
    )
}

export default Profile
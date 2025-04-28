import React from 'react'
import { power } from '../Images/images'
import Loader from './Loader'

const LoaderScreen = () => {
    return (
        <div className='bg-bgColor dark:bg-dark_bgColor w-screen h-screen pb-52 flex flex-col gap-14 justify-center items-center relative' >
            <img src={power} alt="FuelFeed" className='w-16 h-16 sm:w-24 sm:h-24' />
            <Loader />

            <div className='absolute bottom-5 flex flex-col items-center justify-center gap-3'>
                <h1 className='font-icon text-mainColor text-6xl'>FuelFeed</h1>
                <h3 className='font-title font-medium text-lg text-gray-700 dark:text-white/70 tracking-wider italic'>A Place to Rise Together</h3>
            </div>

        </div>
    )
}

export default LoaderScreen
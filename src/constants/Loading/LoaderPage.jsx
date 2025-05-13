import React from 'react'
import Loader from './Loader'

// Used for Page Layout

const LoaderPage = () => {
    return (
        <div className='w-full h-full rounded-lg p-4 mx-auto flex justify-center items-center gap-4 
        dark:bg-dark_altColor dark:text-white'>
            <Loader />
        </div>
    )
}

export default LoaderPage
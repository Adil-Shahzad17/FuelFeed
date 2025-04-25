import React from 'react'
import { power } from '@/constants/Images/images'

const WhatsOnYourMind = () => {
    return (
        <div className='bg-white w-full mx-auto border-2 rounded-md shadow-sm shadow-altColor border-bgColor
        flex items-center gap-5 p-3 hover:cursor-pointer'>

            <div className="w-12 h-12 rounded-full bg-cover bg-center border border-black"
                style={{ backgroundImage: `url(${power})` }} />

            <div className='bg-bgColor w-2/3 pl-4 py-3 rounded-full font-body text-black/50 text-sm sm:text-base'>
                <h1>
                    What's on, your mind, User?
                </h1>
            </div>

        </div>
    )
}

export default WhatsOnYourMind
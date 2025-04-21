import React from 'react'

const WhatsOnYourMind = () => {
    return (
        <div className='bg-white border-2 rounded-md shadow-md shadow-altColor border-bgColor
        flex items-center gap-5 py-3 pl-3 hover:cursor-pointer'>

            <div className='w-12 h-12 rounded-full bg-mainColor' />

            <div className='bg-bgColor w-2/3 pl-5 py-3 rounded-full font-body text-black/50'>
                <h1>
                    What's on, your mind, User?
                </h1>
            </div>

        </div>
    )
}

export default WhatsOnYourMind
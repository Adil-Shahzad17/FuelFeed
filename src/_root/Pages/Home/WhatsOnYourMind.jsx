import React from 'react'
import { profilePhoto } from '@/constants/Images/images'
import userService from '@/lib/appwrite/services/UserService'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const WhatsOnYourMind = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user.userData)

    return (
        <div className='bg-white w-full mx-auto my-3 rounded-md shadow-sm shadow-altColor
        flex items-center gap-5 p-3 hover:cursor-pointer dark:bg-dark_altColor dark:shadow-none'
            onClick={() => navigate('createpost')}>

            <div
                className="w-12 h-12 rounded-full bg-cover bg-center border border-black"
                style={{
                    backgroundImage: `url(${user.profile_img ? userService.getUserFilePreview(user.profile_img) : profilePhoto})`
                }}
            />

            <div className='bg-bgColor w-2/3 pl-4 py-3 rounded-full font-body text-black/50 text-sm sm:text-base
            dark:bg-dark_hoverColor dark:text-white'>
                <h1>
                    What's on, your mind, User?
                </h1>
            </div>

        </div>
    )
}

export default WhatsOnYourMind
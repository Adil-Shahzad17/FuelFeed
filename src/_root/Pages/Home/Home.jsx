import React from 'react'
import WhatsOnYourMind from './WhatsOnYourMind'
import Demo from '@/Demo'
import Posts from './Posts'
import { useSelector } from 'react-redux'

const Home = () => {

    return (
        <div className="h-screen w-full mx-auto px-2 flex flex-col gap-3 overflow-y-auto">
            <WhatsOnYourMind />
            {/* <Posts show="home" /> */}
            {/* <Demo /> */}
        </div>
    )
}

export default Home
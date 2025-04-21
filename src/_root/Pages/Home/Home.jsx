import React from 'react'
import WhatsOnYourMind from './WhatsOnYourMind'
import Story from './Stories/Story'

const Home = () => {
    return (
        <aside className='bg-white mx-5 h-full flex flex-col gap-3'>
            <WhatsOnYourMind />
            <Story />
        </aside>
    )
}

export default Home
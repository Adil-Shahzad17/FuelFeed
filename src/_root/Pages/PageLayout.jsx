import React from 'react'
import Tabs from '@/constants/Tabs/Tabs'
import Home from './Home/Home'

const PageLayout = () => {
    return (
        <main className='bg-bgColor mt-16 flex justify-center h-[calc(100vh-4rem)]'>

            <div className='bg-white flex flex-col gap-4 px-2 w-full mx-auto md:pt-3 md:max-w-[600px] '>
                <Tabs />
                <Home />
            </div>
        </main>

    )
}

export default PageLayout
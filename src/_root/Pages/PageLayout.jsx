import React from 'react'
import Tabs from '@/constants/Tabs/Tabs'
import { Outlet } from 'react-router-dom'

const PageLayout = () => {
    return (
        <main className='mt-16 flex justify-center h-[calc(100vh-4rem)]' >

            <div className='relative flex flex-col gap-4 px-2 w-full mx-auto pt-3 min-w-[280px] md:max-w-[600px] overflow-auto md:border-l md:border-l-black/10 dark:md:border-l-white/20 dark:bg-dark_bgColor'>

                <Tabs />
                <Outlet />
            </div>

        </main>

    )
}

export default PageLayout
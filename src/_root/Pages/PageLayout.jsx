import React from 'react'
import Tabs from '@/constants/Tabs/Tabs'


const PageLayout = () => {
    return (
        <main className='bg-bgColor mt-16 flex justify-center h-[calc(100vh-4rem)]'>

            <div className='bg-teal-950 w-full md:max-w-[700px]  mx-auto'>

                <Tabs />
            </div>
        </main>

    )
}

export default PageLayout
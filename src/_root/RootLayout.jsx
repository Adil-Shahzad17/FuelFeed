import React from 'react'
import Sidebar from '../components/shared/Sidebar/Sidebar'
import ThemeSwitch from '@/components/shared/Sidebar/ThemeSwitch'
import Demo from '@/Demo'
import Header from '@/components/shared/Header/Header'
import PageLayout from './Pages/PageLayout'

const RootLayout = () => {
    return (
        <div className='min-w-[320px] mx-auto max-w-screen-2xl grid grid-rows-[auto_1fr] grid-cols-1 relative bg-bgColor'>

            <Header />

            <main className="grid grid-cols-[1fr] md:grid-cols-[384px_1fr]">
                <Sidebar />
                <PageLayout />
            </main>
            {/* <Demo /> */}
        </div>



    )
}

export default RootLayout
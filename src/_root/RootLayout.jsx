import React from 'react'
import Sidebar from '../components/shared/Sidebar/Sidebar'
import Demo from '@/Demo'
import Header from '@/components/shared/Header/Header'
import PageLayout from './Pages/PageLayout'

const RootLayout = () => {
    return (
        <div className='min-w-[320px] mx-auto max-w-screen-xl grid grid-rows-[auto_1fr] grid-cols-1 relative bg-bgColor'>

            <Header />

            <main className="h-screen grid md:grid-cols-[280px_1fr] lg:grid-cols-[350px_1fr]">
                <Sidebar />
                <PageLayout />
            </main>
            {/* <Demo /> */}
        </div>
    )
}

export default RootLayout
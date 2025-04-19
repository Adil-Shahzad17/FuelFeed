import React from 'react'
import Sidebar from '../components/shared/Sidebar/Sidebar'
import ThemeSwitch from '@/components/shared/Sidebar/ThemeSwitch'

const RootLayout = () => {
    return (
        <div className='min-w-[320px] flex justify-center items-center h-screen relative bg-red-700'>
            {/* <Header /> */}
            {/* <Home /> */}
            <ThemeSwitch />
            <Sidebar />
        </div>
    )
}

export default RootLayout
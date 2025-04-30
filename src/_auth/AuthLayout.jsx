import React from 'react'
import ThemeSwitch from '@/components/shared/Sidebar/ThemeSwitch'
import { Outlet } from 'react-router-dom'


const AuthLayout = () => {

    return (
        <div className='relative min-w-[320px] flex md:items-center justify-center min-h-screen py-8 dark:bg-dark_bgColor dark:text-white'>
            <div className="absolute right-3 top-3">
                <ThemeSwitch />
            </div>
            <Outlet />
        </div>
    )
}

export default AuthLayout
import React from 'react'
import ThemeSwitch from '@/components/shared/Sidebar/ThemeSwitch'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const AuthLayout = ({ authentication }) => {
    // If user is authenticated do not allow if to access auth routes.
    if (!authentication) {
        return (
            <div className='relative min-w-[320px] flex md:items-center justify-center min-h-screen py-8 dark:bg-dark_bgColor dark:text-white'>
                <div className="absolute right-3 top-3">
                    <ThemeSwitch />
                </div>
                <Outlet />
            </div>
        )
    } else {
        return <Navigate to="/" replace />;
    }
}

export default AuthLayout
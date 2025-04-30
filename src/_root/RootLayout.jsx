import React from 'react'
import Sidebar from '../components/shared/Sidebar/Sidebar'
import Header from '@/components/shared/Header/Header'
import PageLayout from './Pages/PageLayout'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RootLayout = () => {

    const auth = useSelector((state) => state.auth.status)
    console.log(auth);

    return auth ? (
        <div className='min-w-[320px] mx-auto max-w-screen-xl grid grid-rows-[auto_1fr] grid-cols-1 relative dark:bg-dark_bgColor bg-bgColor'>

            <Header />

            <main className="h-screen grid md:grid-cols-[280px_1fr] lg:grid-cols-[350px_1fr]">
                <Sidebar />
                <PageLayout />
            </main>
        </div>
    ) : <Navigate to="/_auth/signup" />
}

export default RootLayout
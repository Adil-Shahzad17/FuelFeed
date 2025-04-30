import React, { useEffect } from 'react'
import Sidebar from '../components/shared/Sidebar/Sidebar'
import Header from '@/components/shared/Header/Header'
import PageLayout from './Pages/PageLayout'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCurrentUserQuery } from '@/lib/tanstack/querys_mutations'
import LoaderScreen from '@/constants/Loading/LoaderScreen'

const RootLayout = () => {

    const auth = useSelector((state) => state.auth.status)
    console.log(auth);

    const { isFetching, refetch } = useCurrentUserQuery()
    const navigate = useNavigate()

    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (
            cookieFallback === "[]" ||
            cookieFallback === null ||
            cookieFallback === undefined
        ) {
            navigate("/_auth/signup");
        }
        refetch();
    }, []);


    return isFetching ? <LoaderScreen /> : (
        <div className='min-w-[320px] mx-auto max-w-screen-xl grid grid-rows-[auto_1fr] grid-cols-1 relative dark:bg-dark_bgColor bg-bgColor'>

            <Header />

            <main className="h-screen grid md:grid-cols-[280px_1fr] lg:grid-cols-[350px_1fr]">
                <Sidebar />
                <PageLayout />
            </main>
        </div>
    )
}

export default RootLayout
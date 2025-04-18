import React from 'react'
import Sidebar from '../components/ui/Sidebar/Sidebar'
import Header from '../components/ui/Header/Header'
import Home from './Pages/Home/Home'
// import Demo from '../Demo'

const RootLayout = () => {
    return (
        <div className='min-w-[320px] flex justify-center items-center h-screen relative bg-red-700'>
            {/* <Header /> */}
            {/* <Home /> */}
            <Sidebar />
            {/* <Demo /> */}
        </div>
    )
}

export default RootLayout
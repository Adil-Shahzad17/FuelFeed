import React from 'react'
import Tabs from '@/constants/Tabs/Tabs'
import Home from './Home/Home'
import CreatePost from '../Forms/CreatePost'
import EditPost from '../Forms/EditPost'
import Profile from './Profile/Profile'
import Demo from '@/Demo'
import Saved from './Saved/Saved'
import EditProfile from '../Forms/EditProfile'

const PageLayout = () => {
    return (
        <main className='mt-16 flex justify-center h-[calc(100vh-4rem)]' >

            <div className='flex flex-col gap-4 px-2 w-full mx-auto md:pt-3 min-w-[280px] md:max-w-[600px] overflow-auto md:border-l md:border-l-black/10'>
                <Tabs />
                {/* <Home /> */}
                {/* <CreatePost /> */}
                {/* <Demo /> */}
                {/* <EditPost /> */}
                {/* <Profile /> */}
                {/* <EditProfile /> */}
                <Saved />
            </div>

        </main>

    )
}

export default PageLayout
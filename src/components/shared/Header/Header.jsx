import React from 'react'
import { power } from '@/constants/Images/images'
import SearchBar from './SearchBar/SearchBar'



const Header = () => {
    return (
        <header className='bg-white shadow-md fixed z-50 w-full h-16 max-w-screen-xl dark:bg-dark_altColor'>
            <nav className='flex justify-between items-center h-full w-full px-5 md:px-10'>
                <div className='flex items-center gap-3 hover:cursor-pointer'>
                    <img src={power} alt="Fuel Feed" className="w-12 h-12 rounded-full sm:h-14 sm:w-14" />
                    <h1 className='font-icon text-mainColor font-normal text-5xl hidden sm:block'>
                        Fuel Feed
                    </h1>
                </div>


                <search>
                    <SearchBar />
                </search>

            </nav>

        </header>
    )
}

export default Header
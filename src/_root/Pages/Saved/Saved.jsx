import React from 'react'
import Posts from '../Home/Posts'

const Saved = () => {
    return (
        <div className="w-full p-4 mx-auto flex flex-col gap-4 dark:text-white">

            <div className="flex gap-3 items-center text-center border-b border-b-black/10 justify-center relative pb-2            ">
                <h1 className="text-2xl font-bold font-title">
                    All Saves</h1>
            </div>

            {/* <Posts show="saved" /> */}
        </div>
    )
}

export default Saved
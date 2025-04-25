import React from 'react'
import Posts from '../Home/Posts'

const Saved = () => {
    return (
        <div className="w-full max-w-[500px] p-4 mx-auto flex flex-col gap-4">

            <div className="flex gap-3 items-center text-center border-b border-b-black/10 justify-center relative pb-2            ">
                <h1 className="text-2xl font-bold font-title">
                    All Saves</h1>
            </div>

            <Posts show="saves" />
        </div>
    )
}

export default Saved
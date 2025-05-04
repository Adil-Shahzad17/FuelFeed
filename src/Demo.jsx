import React from 'react'
import { Button } from './components/ui/components'
import userService from './lib/appwrite/services/UserService'
import credentials from './lib/credentials'
import { Skeleton } from './components/ui/skeleton'



const Demo = () => {



    return (
        <>
            <div className='h-full w-full sm:p-2 bg-black text-black flex flex-col items-start space-y-3'>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />

            </div>
        </>

    )
}

export default Demo



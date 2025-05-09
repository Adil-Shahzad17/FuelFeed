import React from 'react'
import { Button } from './components/ui/components'
import { useSelector } from 'react-redux'
import authservice from './lib/appwrite/services/AuthService'
// import Countdown from 'react-countdown'

const Demo = () => {

    const auth = useSelector((state) => state.auth?.userData)
    console.log(auth && auth.sessions.sessions[0].$createdAt);

    const handle = async () => {
        const time = auth.sessions.sessions[0].$createdAt
        console.log(new Date(time).getTime());
        console.log(new Date(time).toLocaleTimeString());
    }





    return (
        <>
            <div className='h-full w-full sm:p-2 text-black flex flex-col items-start space-y-3'>
                <Button onClick={handle}>
                    Submit
                </Button>
            </div>
        </>

    )
}

export default Demo



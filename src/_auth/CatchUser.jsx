import { Button, Separator } from '@/components/ui/components'
import React from 'react'
import { Link } from 'react-router-dom'

const CatchUser = () => {
    return (
        <div className='flex flex-col justify-center items-center text-center font-heading px-5 gap-5 max-w-[750px]'>
            <h1 className='text-2xl sm:text-3xl'>Ah, splendid! The trap was set with precision and you danced right into it. <br /> Delightful!</h1>
            <h2 className='text-lg text-mainColor'>You think you can get away with it?</h2>
            <h3 className='text-lg text-cyan-600'>2 hour Cooldown period</h3>

            <Separator />

            <h3 className='text-lg italic'>"It’s time to put into action the learnings from your previous visit."</h3>
            .............................

            <Button className="text-center text-sm font-body mx-auto w-[250px]">
                <Link to="/_auth/signup">
                    Back
                </Link>
            </Button>

        </div>
    )
}

export default CatchUser
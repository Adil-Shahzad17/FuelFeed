import React from 'react'
import { Button } from './components/ui/components'
import userService from './lib/appwrite/services/UserService'
import credentials from './lib/credentials'



const Demo = () => {

    const submit = async () => {
        try {
            const createUser = await userService.createUser({ user_id: 'e80f245cf0249b', user_name: 'RKP' })
            if (createUser) console.log(createUser)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-full bg-bgColor text-black flex justify-center items-center'>
            <Button className='bg-mainColor' onClick={submit}>
                Hello
            </Button>
        </div>
    )
}

export default Demo



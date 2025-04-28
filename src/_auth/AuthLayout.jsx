import React from 'react'
import Signin from './Signin/Signin'
import Signup from './Signup/Signup'


const AuthLayout = () => {
    return (
        <div className='min-w-[320px] flex md:items-center justify-center min-h-screen py-8 relative dark:bg-dark_bgColor dark:text-white'>

            <Signin />
            {/* <Signup /> */}
        </div>
    )
}

export default AuthLayout
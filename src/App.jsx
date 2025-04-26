import React from 'react'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import Loader from './constants/Loading/LoaderScreen'

const App = () => {
  return (
    <div>
      {/* <Loader /> */}
      <RootLayout />
      {/* <AuthLayout /> */}
    </div>
  )
}

export default App
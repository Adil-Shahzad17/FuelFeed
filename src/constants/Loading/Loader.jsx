import React from 'react'
import './Loading.css'

// Red Bar Loader
const Loader = ({ className }) => {
    return (
        <div className={`loader ${className} mx-auto`} />
    )
}

export default Loader
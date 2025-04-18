import React from 'react'
import { GiExitDoor } from 'react-icons/gi'

const Logout = () => {
    return (
        <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li className="rounded-md rounded-l-md hover:bg-hoverColor">
                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                    <GiExitDoor size={24} color='#343a40' />
                    <span className="capitalize">Logout</span>
                </a>
            </li>
        </ul>
    )
}

export default Logout
"use client"
import { IoSearch } from "react-icons/io5";
import React from "react"


const Demo = () => {


    return (
        <ul className="flex gap-5 text-center text-gray-500">
            <li>
                <a href="#page1" className="flex justify-center border-b-4 border-transparent
                focus:text-indigo-600 focus:border-indigo-600 hover:text-black hover:border-mainColor py-4">
                    <IoSearch />
                    Pilot  Training</a>
            </li>
            <li>
                <a href="#page2" className="flex justify-center border-b-4 border-transparent hover:text-bgColor hover:border-indigo-600 py-4">Titan maintenance</a>
            </li>
            <li>
                <a href="#page3" className="flex justify-center border-b-4 border-transparent hover:text-bgColor hover:border-indigo-600 py-4">Loadout</a>
            </li>
            <li>
                <a href="#page4" className="flex justify-center border-b-4 border-transparent hover:text-bgColor hover:border-indigo-600 py-4">Server Browser</a>
            </li>
            <li>
                <a href="#page5" className="flex justify-center border-b-4 border-transparent hover:text-bgColor hover:border-indigo-600 py-4">Settings</a>
            </li>
        </ul>


    )
}

export default Demo
import React, { useState } from "react"
import { Sidebar_Tabs_Icons } from "../Icons/SideBarIcons";
import Menu from "./Menu/Menu";

const Tabs = () => {

    return (
        <ul
            className="flex justify-around gap-5 text-center text-gray-500 font-title bg-bgColor h-auto 
  shadow-md min-w-[280px] w-full md:hidden">

            {
                Sidebar_Tabs_Icons.map((icons) => (
                    <li key={icons.iconName} className="w-full">
                        <a href="#page1" className="flex justify-center border-b-4 border-transparent
                focus:border-mainColor hover:border-mainColor p-5">
                            {icons.icon}
                        </a>
                    </li>
                ))
            }

            <li className="w-full"
            >
                <Menu />
            </li>

        </ul>



    )
}

export default Tabs
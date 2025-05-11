import React from "react"
import { Sidebar_Tabs_Icons } from "../Icons/SideBarIcons";
import Menu from "./Menu/Menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Tabs = () => {

    const user = useSelector((state) => state.user.userData)

    return (
        <ul
            className="h-auto flex justify-around gap-3 text-center text-gray-500 font-title bg-bgColor 
  shadow-md min-w-[280px] w-full md:hidden dark:bg-dark_altColor">

            {
                Sidebar_Tabs_Icons.map((icons) => (
                    <li key={icons.iconName} className="py-5 w-full h-full flex items-center justify-center
                   border-b-4 border-transparent focus:border-mainColor hover:border-mainColor">
                        <Link to={icons.iconName === 'profile' ? `/profile/${user.$id}` : icons.navigate} className="flex justify-center">
                            {icons.icon}
                        </Link>
                    </li>
                ))
            }

            <li className="w-full h-full flex items-center justify-center
                   border-b-4 border-transparent focus:border-mainColor hover:border-mainColor"
            >
                <Menu />
            </li>

        </ul>



    )
}

export default Tabs
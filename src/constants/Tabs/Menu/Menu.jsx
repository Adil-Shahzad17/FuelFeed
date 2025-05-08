import React from 'react'
import { SettingIcons } from '@/constants/Icons/SideBarIcons'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/components"
import { IoMenu } from "react-icons/io5";
import LogoutAlert from '@/constants/Alerts/LogoutAlert';
import { Link } from 'react-router-dom';


const Menu = () => {
    return (

        <DropdownMenu>
            <DropdownMenuTrigger><IoMenu size={32} /></DropdownMenuTrigger>
            <DropdownMenuContent className='dark:bg-dark_altColor dark:text-white'>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ul className="space-y-4">

                    {
                        SettingIcons.map((icons) => (
                            <li key={icons.iconName} className="rounded-l-md hover:bg-hoverColor dark:hover:bg-dark_hoverColor">
                                <Link to={icons.navigate} className="flex items-center p-2 space-x-3 rounded-md">
                                    {icons.icon}
                                    {
                                        icons.iconName !== "theme" && <span className="capitalize font-body font-semibold">{icons.iconName}</span>
                                    }
                                </Link>
                            </li>
                        ))
                    }

                </ul>

                <div className='pt-3'>
                    <LogoutAlert />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Menu
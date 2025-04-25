import React from 'react'
import { SettingIcons } from '@/constants/Icons/SideBarIcons'
import Logout from '@/components/shared/Sidebar/Logout'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoMenu } from "react-icons/io5";
import LogoutAlert from '@/constants/Alerts/LogoutAlert';


const Menu = () => {
    return (

        <DropdownMenu>
            <DropdownMenuTrigger><IoMenu size={32} /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ul className="space-y-4">

                    {
                        SettingIcons.map((icons) => (
                            <li key={icons.iconName} className="rounded-l-md hover:bg-hoverColor">
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    {icons.icon}
                                    {
                                        icons.iconName !== "theme" && <span className="capitalize font-body font-semibold">{icons.iconName}</span>
                                    }
                                </a>
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
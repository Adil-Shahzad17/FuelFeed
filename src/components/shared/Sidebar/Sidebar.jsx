import React from 'react'
import { power } from '@/constants/Images/images';
import { Sidebar_Tabs_Icons, SettingIcons } from '../../../constants/Icons/SideBarIcons';
import LogoutAlert from '@/constants/Alerts/LogoutAlert';

const Sidebar = () => {
    return (
        <div className="z-10 mt-16 pt-3 pl-3 bg-bgColor text-black hidden md:block">
            <div className="flex items-center p-2 space-x-4 rounded-l-md hover:cursor-pointer hover:bg-hoverColor">
                <img src={power} alt="Fuel Feed" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                <div>
                    <h2 className="text-lg font-title font-semibold">Leroy Jenkins</h2>
                </div>
            </div>

            <div className="divide-y dark:divide-gray-300 pt-4 font-body text-sm font-semibold tracking-wider">
                <ul className="pt-2 pb-4 space-y-1">

                    {
                        Sidebar_Tabs_Icons.map((icons) => (
                            <li key={icons.iconName} className="rounded-l-md hover:bg-hoverColor">
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    {icons.icon}
                                    <span className="capitalize">{icons.iconName}</span>
                                </a>
                            </li>
                        ))
                    }

                </ul>

                <ul className="py-4 space-y-1">

                    {
                        SettingIcons.map((icons) => (
                            <li key={icons.iconName} className="rounded-l-md hover:bg-hoverColor">
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    {icons.icon}
                                    {
                                        icons.iconName !== "theme" && <span className="capitalize">{icons.iconName}</span>
                                    }
                                </a>
                            </li>
                        ))
                    }

                </ul>

                <div className='pt-3'>
                    <LogoutAlert />
                </div>

            </div>
        </div>
    )
}

export default Sidebar
import React from 'react'
import power from "../../../assets/Images/power.png"
import { SidebarIcons, SettingIcons } from '../../../constants/Icons/SideBarIcons';
import Logout from './Logout';
// import ThemeBtn from './ThemeBtn';

const Sidebar = () => {
    return (
        <div className="absolute left-0 pt-3 w-72 pl-3 h-full bg-bgColor text-black lg:block">
            <div className="flex items-center p-2 space-x-4 rounded-l-md hover:cursor-pointer hover:bg-hoverColor">
                <img src={power} alt="Fuel Feed" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                <div>
                    <h2 className="text-lg font-title font-semibold">Leroy Jenkins</h2>
                </div>
            </div>

            <div className="divide-y dark:divide-gray-300 pt-4 font-body text-sm font-semibold tracking-wider">
                <ul className="pt-2 pb-4 space-y-1">

                    {SidebarIcons.map((iconObj) => {
                        const [key, IconComponent] = Object.entries(iconObj)[0];
                        return (
                            <li key={key} className="rounded-l-md hover:bg-hoverColor">
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    {IconComponent}
                                    <span className="capitalize">{key}</span>
                                </a>
                            </li>
                        );
                    })}

                </ul>

                <ul className="py-4 space-y-1">

                    {SettingIcons.map((iconObj) => {
                        const [key, IconComponent] = Object.entries(iconObj)[0];
                        return (
                            <li key={key} className="rounded-md rounded-l-md hover:bg-hoverColor">
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    {IconComponent}
                                    <span className="capitalize">{key}</span>
                                </a>
                            </li>
                        );
                    })}

                </ul>

                <Logout />
                {/* <ThemeBtn /> */}

            </div>
        </div>
    )
}

export default Sidebar
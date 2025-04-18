import { GoHomeFill } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { IoIosBookmark } from "react-icons/io";
import { BsNintendoSwitch } from "react-icons/bs";

export const SidebarIcons = [
  {
    home: <GoHomeFill size={24} color="#358f80" />,
  },
  {
    profile: <IoPersonCircleOutline size={24} color="#197AE8" />,
  },
  {
    saved: <IoIosBookmark size={24} color="#EF233C" />,
  },
];

export const SettingIcons = [
  {
    theme: <BsNintendoSwitch size={20} color="#ff7b00" />,
  },
  {
    help: <IoIosHelpCircle size={24} color="#5a189a" />,
  },
];

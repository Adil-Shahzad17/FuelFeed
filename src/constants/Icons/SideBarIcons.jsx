import { GoHomeFill } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { IoIosBookmark } from "react-icons/io";
import ThemeSwitch from "@/components/shared/Sidebar/ThemeSwitch";

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
    theme: <ThemeSwitch />,
  },
  {
    help: <IoIosHelpCircle size={24} color="#5a189a" />,
  },
];

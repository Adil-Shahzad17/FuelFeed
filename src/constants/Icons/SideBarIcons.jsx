import { GoHomeFill } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { IoIosBookmark } from "react-icons/io";
import ThemeSwitch from "@/components/shared/Sidebar/ThemeSwitch";

export const Sidebar_Tabs_Icons = [
  {
    iconName: "home",
    icon: <GoHomeFill size={32} color="#358f80" />,
  },
  {
    iconName: "profile",
    icon: <IoPersonCircleOutline size={32} color="#197AE8" />,
  },
  {
    iconName: "saved",
    icon: <IoIosBookmark size={32} color="#EF233C" />,
  },
];

export const SettingIcons = [
  {
    iconName: "theme",
    icon: <ThemeSwitch />,
  },
  {
    iconName: "help",
    icon: <IoIosHelpCircle size={24} color="#5a189a" />,
  },
];

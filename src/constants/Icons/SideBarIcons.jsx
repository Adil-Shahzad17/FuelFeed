import { GoHomeFill } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { IoIosBookmark } from "react-icons/io";


export const Sidebar_Tabs_Icons = [
  {
    iconName: "home",
    icon: <GoHomeFill size={32} color="#358f80" />,
    navigate: "/"
  },
  {
    iconName: "profile",
    icon: <IoPersonCircleOutline size={32} color="#197AE8" />,
    navigate: `profile`

  },
  {
    iconName: "saved",
    icon: <IoIosBookmark size={32} color="#EF233C" />,
    navigate: "saved"
  },
];

export const SettingIcons = [
  {
    iconName: "About",
    icon: <IoIosHelpCircle size={32} color="#5a189a" />,
    navigate: "help"
  },
];

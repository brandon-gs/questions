import { NavbarItemProps } from "../components/Layout/NavbarItem/NavbarItem";
import {
  FaCogs,
  FaComments,
  FaPlus,
  FaSignInAlt,
  FaBars,
} from "react-icons/fa";

const navbarItems: NavbarItemProps[] = [
  {
    href: "/",
    text: "browse",
    Icon: FaBars,
  },
  {
    href: "/",
    text: "add new questions",
    Icon: FaPlus,
  },
  {
    href: "/",
    text: "api",
    Icon: FaCogs,
  },
  {
    href: "/",
    text: "discuss",
    Icon: FaComments,
  },
  {
    href: "/",
    text: "login",
    Icon: FaSignInAlt,
  },
];

export default navbarItems;

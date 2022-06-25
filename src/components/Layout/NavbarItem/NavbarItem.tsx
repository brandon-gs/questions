import React from "react";
import Link from "next/link";
import styles from "./NavbarItem.module.css";
import { IconType } from "react-icons";

export interface NavbarItemProps {
  href: string;
  text: string;
  Icon: IconType;
}

function NavbarItem({ href, text, Icon }: NavbarItemProps) {
  return (
    <li className={styles.navbar_item}>
      <Link href={href}>
        <a>
          <Icon color="white" />
          {text}
        </a>
      </Link>
    </li>
  );
}

export default NavbarItem;

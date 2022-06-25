import React from "react";
import navbarItems from "../../../utils/navbarItems";
import NavbarItem from "../NavbarItem/NavbarItem";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.navbar}>
      <ul className={styles.menu}>
        {navbarItems.map((item, index) => (
          <NavbarItem key={`navbar-item-${index}`} {...item} />
        ))}
      </ul>
    </header>
  );
}

export default Navbar;

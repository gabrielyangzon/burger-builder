import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      {/* <button onClick={props.menuClicked}>MENU</button> */}

      <DrawerToggle clicked={props.menuClicked} />
      <Logo height="80%" />
      <nav className={styles.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;

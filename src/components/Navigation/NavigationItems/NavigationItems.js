import React from "react";
import styles from "./NavigationItems.module.css";

import { NavLink } from "react-router-dom";

const NavigationItems = props => {
  return (
    <ul className={styles.NavigationItems}>
      <li className={styles.NavigationItem}>
        <NavLink
          activeClassName={styles.active}
          onClick={props.clicked}
          to="/burger"
        >
          Burger Builder
        </NavLink>
      </li>
      <li className={styles.NavigationItem}>
        <NavLink
          activeClassName={styles.active}
          onClick={props.clicked}
          to="/checkout"
        >
          Check out
        </NavLink>
      </li>
      <li className={styles.NavigationItem}>
        <NavLink
          activeClassName={styles.active}
          onClick={props.clicked}
          to="/orders"
        >
          Your orders
        </NavLink>
      </li>
    </ul>
  );
};

export default NavigationItems;

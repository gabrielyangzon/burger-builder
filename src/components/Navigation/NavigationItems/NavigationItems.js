import React from "react";
import styles from "./NavigationItems.module.css";

import { NavLink } from "react-router-dom";

const NavigationItems = (props) => {
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

      {/* <li className={styles.NavigationItem}>
        <NavLink
          activeClassName={styles.active}
          onClick={props.clicked}
          to="/checkout"
        >
          Check out
        </NavLink>
      </li> */}
      {props.isAuthenticated ? (
        <li className={styles.NavigationItem}>
          <NavLink
            activeClassName={styles.active}
            onClick={props.clicked}
            to="/orders"
          >
            Your orders
          </NavLink>
        </li>
      ) : null}
      <li className={styles.NavigationItem}>
        {props.isAuthenticated ? (
          <NavLink
            activeClassName={styles.active}
            onClick={props.clicked}
            to="/logout"
          >
            Logout
          </NavLink>
        ) : (
          <NavLink
            activeClassName={styles.active}
            onClick={props.clicked}
            to="/login"
          >
            Sign in
          </NavLink>
        )}
      </li>
    </ul>
  );
};

export default NavigationItems;

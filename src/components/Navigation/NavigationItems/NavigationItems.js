import React from "react";
import styles from "./NavigationItems.module.css";

const NavigationItems = () => {
  return (
    <ul className={styles.NavigationItems}>
      <li className={styles.NavigationItem}>
        <a href="/">A Link1</a>
      </li>
      <li className={styles.NavigationItem}>
        <a href="/">A Link2</a>
      </li>
    </ul>
  );
};

export default NavigationItems;

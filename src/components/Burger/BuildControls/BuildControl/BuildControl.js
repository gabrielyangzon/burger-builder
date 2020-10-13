import React from "react";
import styles from "./BuildControl.module.css";

const BuildControl = (props) => (
  <div className={styles.BuildControl}>
    <div className={styles.Label}>{props.label}</div>
    <button
      className={styles.Less}
      onClick={props.less}
      disabled={props.isDisable}
    >
      -
    </button>
    <button className={styles.More} onClick={props.add}>
      +
    </button>
  </div>
);

export default BuildControl;

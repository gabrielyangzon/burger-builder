import React from "react";
import styles from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";
import Logo from "../../Logo/Logo";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";

const SideDrawer = props => {
  let attachedClasses = [styles.SideDrawer, styles.Close];

  if (props.open) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <Logo height="11%" marginBottom="22px" />
        <ul>
          <NavigationItems clicked={props.closed} />
        </ul>
      </div>
    </Aux>
  );
};

export default SideDrawer;

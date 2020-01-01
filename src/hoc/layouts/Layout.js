import React, { useState } from "react";
import Aux from "../Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerOpenHandler = () => {
    setShowSideDrawer(prevSate => {
      return !prevSate;
    });
  };

  return (
    <Aux>
      <Toolbar menuClicked={sideDrawerOpenHandler} />
      <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
      <main style={styles.content}>{props.children}</main>
    </Aux>
  );
};

const styles = {
  content: {
    marginTop: "72px"
  }
};

export default Layout;

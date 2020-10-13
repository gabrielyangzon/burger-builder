import React, { useState } from "react";
import { connect } from "react-redux";
import Aux from "../Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerOpenHandler = () => {
    setShowSideDrawer((prevSate) => {
      return !prevSate;
    });
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        menuClicked={sideDrawerOpenHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main style={styles.content}>{props.children}</main>
    </Aux>
  );
};

const styles = {
  content: {
    marginTop: "72px",
  },
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token ? true : false,
  };
};

export default connect(mapStateToProps)(Layout);

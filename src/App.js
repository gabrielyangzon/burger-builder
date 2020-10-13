import React, { useEffect } from "react";
import Layout from "./hoc/layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
function App({ isAuthenticated, onTryAutoSignUp }) {
  useEffect(() => {
    onTryAutoSignUp();
  }, []);

  let routes = (
    <Switch>
      <Route exact path="/burger" component={BurgerBuilder} />
      <Route path="/login" component={Auth} />
      <Redirect from="/" to="/burger" />
    </Switch>
  );
  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path="/burger" component={BurgerBuilder} />
        <Route path="/checkout" component={CheckOut} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Redirect from="/" to="/burger" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token ? true : false,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

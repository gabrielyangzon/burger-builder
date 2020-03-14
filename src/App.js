import React from "react";
import Layout from "./hoc/layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/burger" component={BurgerBuilder} />
            <Route path="/checkout" component={CheckOut} />
            <Route path="/orders" component={Orders} />
            <Redirect from="/" to="/burger" />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;

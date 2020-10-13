import React, { useEffect } from "react";
import Orders from "../../components/Order/Order/Orders";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

import Spinner from "../../components/UI/spinners/spinners";

function Order({ orders, onFetchYourOrders, loading, token, userId }) {
  console.log(token);
  useEffect(() => {
    onFetchYourOrders(token, userId);
  }, []);

  let component = <Spinner />;

  if (!loading) {
    component = Object.entries(orders).map((x) => (
      <Orders
        key={x[0]}
        price={x[1].price}
        // date={x[1].orderDate}
        ingredients={x[1].ingredients}
      />
    ));
  }

  return <div>{component}</div>;
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchYourOrders: (token, userId) =>
      dispatch(actionCreators.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);

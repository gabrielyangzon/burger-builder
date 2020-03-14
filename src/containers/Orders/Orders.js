import React, { useState, useEffect } from "react";
import Orders from "../../components/Order/Order/Orders";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrrorHandler/withErrorHandler";

function Order() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios
      .get("/orders.json")
      .then(response => setOrder(response.data))
      .catch(err => console.log(err));
  }, []);

  let Component = () => {
    return Object.entries(order).map(x => (
      <Orders
        key={x[0]}
        price={x[1].totalPrice}
        date={x[1].orderDate}
        ingredients={x[1].ingredients}
      />
    ));
  };

  return (
    <div>
      <Component />
    </div>
  );
}

export default Order;

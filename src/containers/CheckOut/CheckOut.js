import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const CheckOut = props => {
  const [data, setData] = useState({
    ingredients: null,
    totalPrice: 0
  });

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const ingredient = {};

    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredient[param[0]] = +param[1];
      }
    }

    setData({ ...data, ingredients: ingredient, totalPrice: price });
  }, []);

  const checkOutCancelHandler = () => {
    props.history.goBack();
  };

  const checkOutContinueHandler = () => {
    props.history.push("/checkout/contact-data");
  };

  return (
    <React.Fragment>
      Checkout page
      {data.ingredients != null ? (
        <CheckoutSummary
          ingredients={data.ingredients}
          checkOutCancel={checkOutCancelHandler}
          checkOutContinue={checkOutContinueHandler}
        />
      ) : null}
      <Route
        exact
        path={props.match.path + "/contact-data"}
        render={props => (
          <ContactData
            ingredients={data.ingredients}
            totalPrice={data.totalPrice}
            {...props}
          />
        )}
      />
    </React.Fragment>
  );
};

export default CheckOut;

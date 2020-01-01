import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const ingredientSummary = Object.entries(props.ingredients).map(x => {
    return (
      <li key={x[0]}>
        <span style={{ textTransform: "capitalize" }}>{x[0]}</span> : {x[1]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>
        <strong> Total Price: $ {props.totalPrice.toFixed(2)} </strong>
      </p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Check out?</p>
      <Button buttonType="Danger" clicked={props.cancelOrder}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={props.continueOrder}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;

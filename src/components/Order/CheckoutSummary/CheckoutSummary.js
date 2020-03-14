import React from "react";

import styles from "./CheckoutSummary.module.css";

import Button from "../../UI/Button/Button";

import Burger from "../../Burger/Burger";

const CheckoutSummary = props => {
  return (
    <React.Fragment>
      <div className={styles.CheckoutSummary}>
        <h3>How it tastes well!</h3>
        <div className={styles.IngredientsDiv}>
          <Burger ingredients={props.ingredients} />
        </div>
        <Button clicked={props.checkOutCancel} buttonType="Danger">
          CANCEL
        </Button>
        <Button clicked={props.checkOutContinue} buttonType="Success">
          PROCEED
        </Button>
      </div>
    </React.Fragment>
  );
};

export default CheckoutSummary;
